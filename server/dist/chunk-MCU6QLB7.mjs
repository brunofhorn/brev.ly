// src/errors/duplicate-short-link.error.ts
var DuplicateShortLinkError = class extends Error {
  constructor() {
    super("Duplicate short link.");
  }
};

export {
  DuplicateShortLinkError
};
