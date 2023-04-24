export class ParseError extends Error {
  public constructor(message: string, line: number) {
    super(`ParseError: ${line}:${message}`);
  }
}
