import { styled } from 'twin.macro';

export const Track = styled.div`
  display: inline-block;
  position: relative;
  margin: 40px 0px 14px;
  height: 4px;
  width: 100%;
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

export const Handle = styled.span<{ active: boolean }>`
  position: relative;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  touch-action: pan-x;
  display: flex;
  align-items: center;
  justify-content: center;

  ::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    width: 24px;
    height: 24px;
    opacity: 0.2;
    background-color: ${(props) => (props.active ? '#6772F9' : 'transparent')};
    transition: background 0.2s ease;
  }

  ::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    width: 14px;
    height: 14px;
    background-color: white;
    border: 2px solid #6772f9;
    transition: border 0.2s ease;
  }
`;

export const ValueTip = styled.span`
  margin-top: -48px;
  font-size: 16px;
  line-height: 1.69em;
  text-align: center;
  height: 24px;
`;
