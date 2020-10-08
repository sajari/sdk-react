import { styled } from '../../components/styles';

const OverlayZIndex = 10000000;

export const BlurContainer = styled('div')({
  position: 'absolute',
  right: 0,
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: OverlayZIndex,

  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const Container = styled('div')({
  backgroundColor: '#fff',
  boxSizing: 'border-box',
  height: '80%',
  padding: '1em',
  width: '80%',
});
