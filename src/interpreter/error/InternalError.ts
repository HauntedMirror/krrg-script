export class InternalError extends Error {
  public constructor() {
    super(`Unexpected Error Occured`);
  }
}
