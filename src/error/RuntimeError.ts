export class RuntimeError extends Error {
  public constructor(message: string, line: number) {
    super(`RuntimeError: ${line}:${message}`);
  }
}
