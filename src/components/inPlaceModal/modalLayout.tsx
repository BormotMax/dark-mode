import React from 'react';

import Portal from '../portal';

type InPlaceModalLayoutProps = {
  isFixedPosition?: boolean;
  children: JSX.Element;
};

const InPlaceModalLayout = ({
  isFixedPosition,
  children,
}: InPlaceModalLayoutProps): JSX.Element => {
  if (isFixedPosition) {
    return (
      <Portal>
        {children}
      </Portal>
    );
  }
  return <>{children}</>;
};

InPlaceModalLayout.defaultProps = { isFixedPosition: false };

export default InPlaceModalLayout;
