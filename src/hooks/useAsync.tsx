/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState, useEffect, useCallback, useRef, DependencyList } from 'react';

export type AsyncState<T> =
  | {
    loading: boolean;
    error?: undefined;
    value?: undefined;
  }
  | {
    loading: true;
    error?: Error | undefined;
    value?: T;
  }
  | {
    loading: false;
    error: Error;
    value?: undefined;
  }
  | {
    loading: false;
    error?: undefined;
    value: T;
  };

type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;

type FunctionReturningPromise = (...args: any[]) => Promise<any>;

type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> = AsyncState<PromiseType<ReturnType<T>>>;

type AsyncFnReturn<T extends FunctionReturningPromise = FunctionReturningPromise> = [
  StateFromFunctionReturningPromise<T>,
  T
];

export const useAsyncFn = <T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = [],
  initialState: StateFromFunctionReturningPromise<T> = { loading: false },
): AsyncFnReturn<T> => {
  const [state, set] = useState<StateFromFunctionReturningPromise<T>>(initialState);
  const mountedStatus = useRef<boolean>(false);
  const lastCallId = useRef(0);

  useEffect(() => {
    mountedStatus.current = true;
    return () => {
      mountedStatus.current = false;
    };
  }, []);

  const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
    const callId = ++lastCallId.current;
    set((prevState) => ({ ...prevState, loading: true }));

    return fn(...args)
      .then((value) => {
        if (mountedStatus.current && callId === lastCallId.current) {
          set({ value, loading: false });
        }
        return value;
      })
      .catch((error: Error) => {
        if (mountedStatus.current && callId === lastCallId.current) {
          set({ error, loading: false });
        }
        return error;
      }) as ReturnType<T>;
  }, deps);

  return [state, (callback as unknown) as T];
};

export const useAsync = <T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = [],
): StateFromFunctionReturningPromise<T> => {
  const [state, callback] = useAsyncFn(fn, deps, { loading: true });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
};
