import ReactDOM from 'react-dom';
import React from 'react';

const DEFAULT_ELEMENT = typeof document !== 'undefined' && document.getElementById('__next');

interface PortalProps {
  element?: HTMLElement;
}

const Portal: React.FC<PortalProps> = ({
  element,
  children,
}) => ReactDOM.createPortal(children, element || DEFAULT_ELEMENT);

export default Portal;
