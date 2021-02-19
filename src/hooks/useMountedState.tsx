import { useCallback, useEffect, useRef } from 'react';

type GetIsMounted = () => boolean;

export const useMountedState = (): GetIsMounted => {
  const mountedRef = useRef<boolean>(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return get;
};
