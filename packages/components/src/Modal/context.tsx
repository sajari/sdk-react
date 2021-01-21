import { createContext } from '@sajari/react-sdk-utils';
import { ModalSize } from './types';

interface ModalContextProps {
  open: boolean;
  titleId?: string;
  bodyId?: string;
  size?: ModalSize;
  onClose?: () => void;
  disableDefaultStyles?: boolean;
}

const [ModalContextProvider, useModalContext] = createContext<ModalContextProps>({
  strict: true,
  name: 'ModalContext',
});

export default ModalContextProvider;
export { useModalContext };
