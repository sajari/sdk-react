import { fireEvent, render, waitFor } from '@testing-library/react';
import * as React from 'react';

import Modal, { ModalCloseButton } from '..';

describe('modal', () => {
  describe('overlay', () => {
    it('should call onClose when click on the overlay', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.click(getByTestId('modal-container'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should disable the handler when closeOnOverlayClick is false', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose} closeOnOverlayClick={false}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.click(getByTestId('modal-container'));
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should ignore the overlay click if the event does not come from the overlay', () => {
      const onClose = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.click(getByTestId('modal'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('key events', () => {
    it('an invalid event should not call onClose', () => {
      const onClose = jest.fn();
      const { container } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.keyDown(container, { key: 'Enter', keyCode: 13 });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should not call onClose when closeOnEsc is false', () => {
      const onClose = jest.fn();
      const { container } = render(
        <Modal open onClose={onClose} closeOnEsc={false}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should call onClose when pressing esc key', () => {
      const onClose = jest.fn();
      const { container } = render(
        <Modal open onClose={onClose}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose of last modal only when pressing esc key when multiple modals are opened', () => {
      const onClose = jest.fn();
      const onClose2 = jest.fn();
      const { container } = render(
        <>
          <Modal open onClose={onClose}>
            <div>modal content</div>
          </Modal>
          <Modal open onClose={onClose2}>
            <div>modal content</div>
          </Modal>
        </>,
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onClose).not.toHaveBeenCalled();
      expect(onClose2).toHaveBeenCalledTimes(1);
    });
  });

  describe('body scroll', () => {
    it('should not block the scroll when modal is rendered closed', () => {
      render(
        <Modal open={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('');
    });

    it('should block the scroll when modal is rendered open', () => {
      render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should block scroll when prop open change to true', () => {
      const { rerender } = render(
        <Modal open={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('');

      rerender(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should unblock scroll when prop open change to false', async () => {
      const { rerender, queryByTestId, getByTestId } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal open={false} onClose={() => null} animationDuration={0}>
          <div>modal content</div>
        </Modal>,
      );
      // Simulate the browser animation end
      fireEvent.animationEnd(getByTestId('modal'));
      await waitFor(
        () => {
          expect(queryByTestId('modal')).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );

      expect(document.body.style.overflow).toBe('');
    });

    it('should unblock scroll when unmounted directly', async () => {
      const { unmount } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');

      unmount();
      expect(document.body.style.overflow).toBe('');
    });

    it('should unblock scroll when multiple modals are opened and then closed', async () => {
      const { rerender, getAllByTestId, queryByText } = render(
        <React.Fragment>
          <Modal open onClose={() => null}>
            <div>first modal</div>
          </Modal>
          <Modal open onClose={() => null}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );
      expect(document.body.style.overflow).toBe('hidden');

      // We close one modal, the scroll should be locked
      rerender(
        <React.Fragment>
          <Modal open onClose={() => null}>
            <div>first modal</div>
          </Modal>
          <Modal open={false} onClose={() => null}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );

      fireEvent.animationEnd(getAllByTestId('modal')[1]);
      await waitFor(
        () => {
          expect(queryByText(/second modal/)).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );
      expect(document.body.style.overflow).toBe('hidden');

      // We close the second modal, the scroll should be unlocked
      rerender(
        <React.Fragment>
          <Modal open={false} onClose={() => null}>
            <div>first modal</div>
          </Modal>
          <Modal open={false} onClose={() => null}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );

      fireEvent.animationEnd(getAllByTestId('modal')[0]);
      await waitFor(
        () => {
          expect(queryByText(/first modal/)).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );
      expect(document.body.style.overflow).toBe('');
    });

    it('should unblock scroll when one modal is closed and the one still open has blockScroll set to false', async () => {
      const { rerender, getAllByTestId, queryByText } = render(
        <React.Fragment>
          <Modal open blockScroll={false} onClose={() => null}>
            <div>first modal</div>
          </Modal>
          <Modal open onClose={() => null}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );
      expect(document.body.style.overflow).toBe('hidden');

      // We close one modal, the scroll should be unlocked as remaining modal is not locking the scroll
      rerender(
        <React.Fragment>
          <Modal open blockScroll={false} onClose={() => null}>
            <div>first modal</div>
          </Modal>
          <Modal open={false} onClose={() => null}>
            <div>second modal</div>
          </Modal>
        </React.Fragment>,
      );

      fireEvent.animationEnd(getAllByTestId('modal')[1]);
      await waitFor(
        () => {
          expect(queryByText(/second modal/)).not.toBeInTheDocument();
        },
        { timeout: 1 },
      );
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('render', () => {
    it('should render null when then modal is not open', () => {
      const { queryByText } = render(
        <Modal open={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(queryByText(/modal content/)).toBeNull();
    });

    it('should render the content when modal is open', () => {
      const { queryByText } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(queryByText(/modal content/)).toBeTruthy();
    });
  });

  describe('composition', () => {
    it('should trigger onClose when click on the close button', () => {
      const onClose = jest.fn();
      const { getByRole } = render(
        <Modal open onClose={onClose}>
          <ModalCloseButton />
        </Modal>,
      );

      fireEvent.click(getByRole('button'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should render the content when modal is open', () => {
      const { queryByText } = render(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(queryByText(/modal content/)).toBeTruthy();
    });
  });

  describe('lifecycle', () => {
    it('should show modal when prop open change to true', () => {
      const { queryByTestId, rerender } = render(
        <Modal open={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(queryByTestId('modal')).toBeNull();
      rerender(
        <Modal open onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(queryByTestId('modal')).toBeTruthy();
    });

    it('should hide modal when prop open change to false', async () => {
      const { getByTestId, queryByTestId, rerender } = render(
        <Modal open onClose={() => null} animationDuration={0.01}>
          <div>modal content</div>
        </Modal>,
      );
      expect(queryByTestId('modal')).toBeTruthy();
      rerender(
        <Modal open={false} onClose={() => null} animationDuration={0.01}>
          <div>modal content</div>
        </Modal>,
      );
      fireEvent.animationEnd(getByTestId('modal'));
      expect(queryByTestId('modal')).toBeNull();
    });
  });

  describe('blockScroll', () => {
    it('should not block the scroll when modal is opened and blockScroll is false', () => {
      render(
        <Modal open blockScroll={false} onClose={() => null}>
          <div>modal content</div>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('onEscKeyDown', () => {
    it('should be called when esc key is pressed', async () => {
      const onEscKeyDown = jest.fn();
      const { container } = render(
        <Modal open onClose={() => null} onEscKeyDown={onEscKeyDown}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.keyDown(container, { keyCode: 27 });
      expect(onEscKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe('onOverlayClick', () => {
    it('should be called when user click on overlay', async () => {
      const onOverlayClick = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={() => null} onOverlayClick={onOverlayClick}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.click(getByTestId('modal-container'));
      expect(onOverlayClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('onAnimationEnd', () => {
    it('should be called when the animation is finished', async () => {
      const onAnimationEnd = jest.fn();
      const { getByTestId } = render(
        <Modal open onClose={() => null} onAnimationEnd={onAnimationEnd}>
          <div>modal content</div>
        </Modal>,
      );

      fireEvent.animationEnd(getByTestId('modal'));
      expect(onAnimationEnd).toHaveBeenCalledTimes(1);
    });
  });
});
