export const isClickOrEnter = (e: KeyboardEvent): boolean => e.keyCode === undefined || e.keyCode === 13;
