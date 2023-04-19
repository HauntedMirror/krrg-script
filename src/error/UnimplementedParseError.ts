import { ParseError } from './ParseError';

export class UnimplementedParseError extends ParseError {
  constructor(line: number, feature: string) {
    super(`${feature} has not yet been implemented.`, line);
  }
}
