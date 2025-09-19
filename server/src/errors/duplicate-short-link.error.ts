export class DuplicateShortLinkError extends Error {
  constructor() {
    super('Duplicate short link.');
  }
}