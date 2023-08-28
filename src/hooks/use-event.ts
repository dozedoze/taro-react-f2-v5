import { useRef, useLayoutEffect, useCallback } from 'react';

type noop = (...args: any[]) => any;

function useEvent<T extends noop>(handler: T) {
  const handlerRef = useRef<React.Ref<T>>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: any[]) => {
    const fn = handlerRef.current;
    return (fn as T)(...args);
  }, []);
}
export default useEvent;
