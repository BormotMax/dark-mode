import Router from 'next/router';
import React from 'react';

const DONE_DURATION = 550;

export const RouteIndicator = () => {
  const [loading, setLoading] = React.useState(null);
  const [timeoutId, setTimeoutId] = React.useState(null);

  const onLoad = () => setLoading(true);
  const onDone = () => {
    setLoading(false);
    setTimeoutId(
      setTimeout(() => {
        setTimeoutId(null);
        setLoading(null);
      }, DONE_DURATION),
    );
  };

  React.useEffect(() => {
    Router.events.on('routeChangeStart', onLoad);
    Router.events.on('routeChangeComplete', onDone);
    Router.events.on('routeChangeError', onDone);

    return () => {
      Router.events.off('routeChangeStart', onLoad);
      Router.events.off('routeChangeComplete', onDone);
      Router.events.off('routeChangeError', onDone);
    };
  });

  React.useEffect(
    () => () => {
      if (timeoutId) clearTimeout(timeoutId);
    },
    [timeoutId],
  );

  return (
    // eslint-disable-next-line no-nested-ternary
    <div className={loading === null ? '' : loading ? 'loading' : 'done'}>
      <style jsx>
        {`
          div {
            position: fixed;
            left: 0;
            top: 0;
            right: 100%;
            z-index: 101;
            height: 2px;
            background-color: hsla(207, 98%, 40%, 0.95);
            box-shadow: 0 1px 8px hsla(0, 0%, 0%, 0.1);
            opacity: 0;
            transition-property: right, opacity;
            transition-duration: 0s;
            pointer-events: none;
          }
          .loading {
            right: 5%;
            opacity: 1;
            transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
            transition-duration: 8s, 0s;
          }
          .done {
            right: 0;
            transition-duration: ${DONE_DURATION}ms;
            transition-delay: 0s, ${DONE_DURATION}ms;
          }
        `}
      </style>
    </div>
  );
};
