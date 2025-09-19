export class InvalidOriginalUrlError extends Error {
  constructor() {
    super('Invalido original URL.');
  }
}