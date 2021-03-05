const getStorybookDirIdx = (splittedPath: string[]) => {
  for (let i = 0; i < splittedPath.length; i += 1) {
    if (splittedPath[i] === 'components') return i;
  }
  return 0;
};
const getTitle = (paths: string[]) => {
  let title = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const dir of paths) {
    const capitalizedDirWithSpaces = dir
      .split('-')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');

    title += `${capitalizedDirWithSpaces}/`;
  }

  const titleWithoutTrailingSlash = title.substring(0, title.length - 1);
  return titleWithoutTrailingSlash;
};

const EmptyComponent = () => null;

interface Response {
  title: string
  component: React.FC<unknown> | (() => null)
  decorators?: unknown[]
  args?: Record<string, any>
  argTypes?: Record<string, any>
}

export const setStoriesGroup = (
  pathToDir: string,
  component?: React.FC<unknown>,
): Response => {
  const splittedPath = pathToDir.split('/');
  const storybookDirIdx = getStorybookDirIdx(splittedPath);
  const arrayIdxAfterStorybookDir = storybookDirIdx + 1;
  const arrayIdxBeforeFile = splittedPath.length - 1;
  const paths = splittedPath.slice(
    arrayIdxAfterStorybookDir,
    arrayIdxBeforeFile,
  );
  const title = getTitle(paths);

  return {
    title: `Main/${title}`,
    component: component || EmptyComponent,
  };
};
