import React from 'react';
import ReactDOM from 'react-dom';

const Portal: React.FC<{
  target: Element;
}> = props => {
  return ReactDOM.createPortal(props.children, props.target);
};

export default Portal;
