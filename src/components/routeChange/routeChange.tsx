import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import cn from 'classnames';

import styles from './routeChange.module.scss';

const DONE_DURATION = 550;

export const RouteIndicator = (): JSX.Element => {
  const [loading, setLoading] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

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

  useEffect(() => {
    Router.events.on('routeChangeStart', onLoad);
    Router.events.on('routeChangeComplete', onDone);
    Router.events.on('routeChangeError', onDone);

    return () => {
      Router.events.off('routeChangeStart', onLoad);
      Router.events.off('routeChangeComplete', onDone);
      Router.events.off('routeChangeError', onDone);
    };
  }, []);

  useEffect(
    () => () => {
      if (timeoutId) clearTimeout(timeoutId);
    },
    [timeoutId],
  );

  return (
    <div
      className={cn({
        [styles.container]: true,
        [styles.loading]: loading,
        [styles.done]: !loading && loading !== null,
      })}
    />
  );
};
