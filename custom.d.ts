declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'form-serialize' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const content: Function;
  export default content;
}
