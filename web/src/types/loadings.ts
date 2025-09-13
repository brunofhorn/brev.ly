export type ILoading = {
  fetchLinks: boolean;
  registerLink: boolean;
  deleteLink: boolean;
};

export type HandleLoadingParams = {
  key: keyof ILoading;
  value: boolean;
};
