import { RuntimeError } from "./RuntimeError";

export class NameNotFoundError extends RuntimeError {
  constructor(line: number, name: string) {
    super(`${name} is not defined.`, line);
  }
}
