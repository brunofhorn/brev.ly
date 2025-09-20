// src/errors/poorly-formatted-short-url.error.ts
var PoorlyFormattedShortUrlError = class extends Error {
  constructor() {
    super("Short url poorly formatted.");
  }
};

export {
  PoorlyFormattedShortUrlError
};
