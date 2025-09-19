export class ShortLinkNotFoundError extends Error {
  constructor() {
    super("Short url not found");
  }
}
