import { styled } from 'twin.macro';

export const Track = styled.div`
  position: relative;
  margin: 40px 0px 14px;
  height: 4px;
  touch-action: none;
`;

export const Segment = styled.div<{ index: number; isSingleHandle: boolean }>`
  background-color: ${(props) =>
    (props.index === 1 && !props.isSingleHandle) || (props.index === 0 && props.isSingleHandle)
      ? 'rgb(103, 114, 249)'
      : 'rgb(218, 223, 231)'};
  height: 100%;
  border-radius: 6px;
  cursor: pointer;
`;

export const Handle = styled.button<{ active: boolean }>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  touch-action: pan-x;
  background-color: white;
  border: 2px solid #6772f9;
  box-shadow: ${(props) => (props.active ? '0 0 0 7px hsla(235, 92%, 69%, 0.25)' : 'none')};
  transition: border 0.2s ease, box-shadow 0.2s ease;

  ::before {
    content: attr(data-value);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding-bottom: 0.5rem;
    font-size: 14px;
    text-align: center;
    opacity: ${(props) => (props.active ? 1 : 0)};
    transition: opacity 0.2s ease;
  }

  :hover::before,
  :focus::before {
    opacity: 1;
  }
`;
