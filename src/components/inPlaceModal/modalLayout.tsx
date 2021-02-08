import React from 'react';

import Portal from '../portal';

interface InPlaceModalLayoutProps {
  isFixedPosition?: boolean;
}

const InPlaceModalLayout: React.FC<InPlaceModalLayoutProps> = ({
  isFixedPosition = false,
  children,
}) => {
  if (isFixedPosition) {
    return (
      <Portal>
        {children}
      </Portal>
    );
  }
  return <>{children}</>;
};

export default InPlaceModalLayout;
