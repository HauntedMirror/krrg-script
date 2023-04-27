import { ParseError } from "./ParseError";

export class UndefinedParseError extends ParseError {
  constructor(line: number) {
    super("An undefined parse error occurred", line);
  }
}
