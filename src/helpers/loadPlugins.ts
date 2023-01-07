export const loadPlugins = (filenames: string[]) => {
  const files = import.meta.glob('@/plugins/*.ts');

  const fileKeys = Object.keys(files).map((fileName) => {
    const splitFileParts = fileName.split('/');
    return splitFileParts[splitFileParts.length - 1].replace('.ts', '');
  });

  for (const filename of filenames) {
    if (fileKeys.includes(filename)) {
      import(`@/plugins/${filename}.ts`);
    } else {
      throw new Error(`No plugin found for ${filename}.`);
    }
  }
};
