import { KrrgScriptLexer } from "../../dist/antlr/KrrgScriptLexer";
import { KrrgScriptParser } from "../../dist/antlr/KrrgScriptParser";
import { FunctionVisitor } from "./FunctionVisitor";

import { ProgramVisitor, BuiltinFunctions } from "./ProgramVisitor";

import {
  CommonTokenStream,
  ANTLRInputStream,
  BailErrorStrategy,
  ANTLRErrorListener,
  Recognizer,
  RecognitionException,
} from "antlr4ts";

class ThrowingErrorListener<V> implements ANTLRErrorListener<V> {
  syntaxError<T extends V>(
    _recognizer: Recognizer<T, any>,
    _offendingSymbol: T | undefined,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | undefined
  ): void {
    throw new Error(`line ${line}:${charPositionInLine} ${msg}`);
  }
}

export default class Interpreter {
  private readonly builtins: BuiltinFunctions;
  constructor(builtins: BuiltinFunctions) {
    this.builtins = builtins;
  }
  run(src: string, args: number[] = [0]) {
    try {
      const inputStream = new ANTLRInputStream(src);
      const lexer = new KrrgScriptLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new KrrgScriptParser(tokenStream);
      lexer.addErrorListener(new ThrowingErrorListener());
      parser.addErrorListener(new ThrowingErrorListener());
      //parser.errorHandler = new BailErrorStrategy();
      const tree = parser.program();
      console.log(tree);
      const programVisitor = new ProgramVisitor();
      const functions = programVisitor.visit(tree);

      const entrypoint = functions.get("krrg_mrh");

      const functionVisitor = new FunctionVisitor(functions, this.builtins);

      if (entrypoint) {
        functionVisitor.invoke(entrypoint, args);
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
