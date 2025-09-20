// src/errors/short-link-not-found.error.ts
var ShortLinkNotFoundError = class extends Error {
  constructor() {
    super("Short url not found");
  }
};

export {
  ShortLinkNotFoundError
};
