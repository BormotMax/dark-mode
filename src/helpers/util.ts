import React from 'react';

type MouseEvent = React.MouseEvent<EventTarget>;
type KeyboardEvent = React.KeyboardEvent<EventTarget>;

function isMouseEvent(event: MouseEvent | KeyboardEvent): event is MouseEvent {
  return event.nativeEvent instanceof MouseEvent;
}

export const isClickOrEnter = (event: MouseEvent | KeyboardEvent): boolean => {
  if (isMouseEvent(event)) {
    return true;
  }
  return event.key === 'Enter';
};

export const getDatasetValue = (target: EventTarget, key: string): string | null => {
  if (target instanceof HTMLElement) {
    return target?.dataset?.[key];
  }
  return null;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const truncate = (str, length = 100, ending = '...') => {
  if (!str) {
    // eslint-disable-next-line no-param-reassign
    str = '';
  }

  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }
  return str;
};
