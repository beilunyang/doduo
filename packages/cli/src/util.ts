export const isGitRepoURL = (url: string): boolean => {
  return /^(https?):\/\/.+?\.git$/.test(url) || /^git@.+?\.git$/.test(url);
};

export const filterGeneratorName = (names: string[]) => {
  const blackNames = ["@doduo/generator-base", "@doduo/cli"];
  return names.filter((name) => blackNames.indexOf(name) === -1);
};
