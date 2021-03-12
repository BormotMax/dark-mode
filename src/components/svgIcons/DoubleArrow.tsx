/* eslint-disable max-len */
import * as React from 'react';

const DoubleArrow = (props: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      d="M12.188 13.813a.36.36 0 00.53 0l.626-.594c.125-.156.125-.406 0-.531L7.688 7l5.656-5.656c.125-.125.125-.375 0-.532L12.719.22a.36.36 0 00-.531 0L5.625 6.75a.423.423 0 000 .531l6.563 6.532zm-4.47 0l.626-.594c.125-.156.125-.406 0-.531L2.688 7l5.656-5.656c.125-.125.125-.375 0-.532L7.719.22a.36.36 0 00-.532 0L.625 6.75a.423.423 0 000 .531l6.563 6.532a.36.36 0 00.53 0z"
    />
  </svg>
);

export default React.memo(DoubleArrow);
