import * as React from 'react';

export interface WrapperStory {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export const WrapperStory = ({
  style,
  children,
}: WrapperStory): JSX.Element => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      ...style,
    }}
  >
    {children}
  </div>
);
