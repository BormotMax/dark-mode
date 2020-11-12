export const isClickOrEnter = (e): boolean => e.keyCode === undefined || e.keyCode === 13;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const truncate = (str, length = 100, ending = '...') => {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }
  return str;
};
