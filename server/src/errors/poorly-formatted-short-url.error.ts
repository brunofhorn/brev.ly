export class PoorlyFormattedShortUrlError extends Error {
  constructor() {
    super("Short url poorly formatted.");
  }
}
