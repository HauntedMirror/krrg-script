import { KrrgScriptVisitor } from "../../dist/antlr/KrrgScriptVisitor";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import {
  FunctionDeclarationContext,
  ProgramContext,
} from "../../dist/antlr/KrrgScriptParser";

import { UndefinedParseError } from "./error/UndefinedParseError";

export type BuiltinFunctions = Map<string, (args: number[]) => number>;

export class ProgramVisitor
  extends AbstractParseTreeVisitor<Map<string, FunctionDeclarationContext>>
  implements KrrgScriptVisitor<Map<string, FunctionDeclarationContext>>
{
  private map: Map<string, FunctionDeclarationContext>;
  constructor() {
    super();
    this.map = new Map();
  }

  protected defaultResult(): Map<string, FunctionDeclarationContext> {
    return this.map;
  }

  visitProgram(ctx: ProgramContext): Map<string, FunctionDeclarationContext> {
    for (const functionContext of ctx.functionDeclaration()) {
      this.visit(functionContext);
    }
    return this.map;
  }

  visitFunctionDeclaration(
    ctx: FunctionDeclarationContext
  ): Map<string, FunctionDeclarationContext> {
    console.log(ctx.FUNCTION_IDENTIFIER().text);
    if (!ctx._name.text) {
      throw new UndefinedParseError(ctx._start.line);
    }
    this.map.set(ctx._name.text, ctx);
    return this.map;
  }
}
