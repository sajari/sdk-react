import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal: React.FC<{
  target: Element;
}> = props => {
  useEffect(() => {
    return () => {
      console.log('destroy');
    };
  }, []);
  return ReactDOM.createPortal(props.children, props.target);
};

export default Portal;
