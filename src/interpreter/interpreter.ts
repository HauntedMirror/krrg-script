import { KrrgScriptLexer } from '../dist/antlr/KrrgScriptLexer';
import { KrrgScriptParser } from '../dist/antlr/KrrgScriptParser';
import { FunctionVisitor } from './FunctionVisitor';

import { ProgramVisitor, BuiltinFunctions } from './ProgramVisitor';

import { CommonTokenStream, ANTLRInputStream } from 'antlr4ts';

export default class Interpreter {
  private readonly builtins: BuiltinFunctions;
  constructor(builtins: BuiltinFunctions) {
    this.builtins = builtins;
  }
  run(src: string, args: number[] = [0]) {
    const inputStream = new ANTLRInputStream(src);
    const lexer = new KrrgScriptLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new KrrgScriptParser(tokenStream);
    const tree = parser.program();
    const programVisitor = new ProgramVisitor();
    const functions = programVisitor.visit(tree);

    const entrypoint = functions.get('krrg_mrh');

    const functionVisitor = new FunctionVisitor(functions, this.builtins);

    if (entrypoint) {
      functionVisitor.invoke(entrypoint, args);
    }
  }
}

