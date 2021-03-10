import { memo } from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
  element?: HTMLElement,
  children: JSX.Element,
};

const Portal = ({
  element,
  children,
}: PortalProps) => ReactDOM.createPortal(children, element || document.body);

export default memo(Portal);
