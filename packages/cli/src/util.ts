export const isGitRepoURL = (url: string): boolean => {
  return /^(https?):\/\/.+?\.git$/.test(url) || /^git@.+?\.git$/.test(url);
};

export const filterGeneratorName = (names: string[]) => {
  const blackNames = ["@ditto/generator-base", "@ditto/cli"];
  return names.filter((name) => blackNames.indexOf(name) > -1);
};
