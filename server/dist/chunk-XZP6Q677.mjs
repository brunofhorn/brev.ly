// src/errors/invalid-original-url.error.ts
var InvalidOriginalUrlError = class extends Error {
  constructor() {
    super("Invalido original URL.");
  }
};

export {
  InvalidOriginalUrlError
};
