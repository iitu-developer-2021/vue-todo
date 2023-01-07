const load = (filenames: string[], files: Record<string, () => Promise<unknown>>, dir: string) => {
  const fileKeys = Object.keys(files).map((fileName) => {
    const splitFileParts = fileName.split('/');
    return splitFileParts[splitFileParts.length - 1].replace('.ts', '');
  });

  for (const filename of filenames) {
    if (fileKeys.includes(filename)) {
      import(`@/${dir}/${filename}.ts`);
    } else {
      throw new Error(`No plugin found for ${filename}.`);
    }
  }
};

export const loadPlugins = (filenames: string[]) => {
  const files = import.meta.glob('@/plugins/*.ts');
  load(filenames, files, 'plugins');
};

export const loadDirectives = (filenames: string[]) => {
  const files = import.meta.glob('@/directives/*.ts');
  load(filenames, files, 'directives');
};
