import { CommonTokenStream, ANTLRInputStream } from 'antlr4ts';
import { KrrgScriptLexer } from '../dist/antlr/KrrgScriptLexer';
import { KrrgScriptParser } from '../dist/antlr/KrrgScriptParser';
import { FunctionVisitor, krrgmrh, Result } from '../src/FunctionVisitor';
import { ProgramVisitor, BuiltinFunctions } from '../src/ProgramVisitor';
import { FunctionDeclarationContext } from '../dist/antlr/KrrgScriptParser';

describe("FunctionVisitor", () => {
  describe("krrgmrh", () => {
    test("krrgmrh()はデビューからの経過年を返す", () => {
      expect(krrgmrh(new Date(2023, 4, 29))).toStrictEqual(0);
      expect(krrgmrh(new Date(2023, 4, 30, 1))).toStrictEqual(1);
      expect(krrgmrh(new Date(2024, 4, 29))).toStrictEqual(1);
      expect(krrgmrh(new Date(2024, 4, 30, 1))).toStrictEqual(2);
    });
  });

  describe("expressions", () => {
    test("krrgmrhはデビューからの経過年を返す", () => {
      const input = 'krrgmrh';
      const expectedResult = krrgmrh();

      const builtins: BuiltinFunctions = new Map();

      const inputStream = new ANTLRInputStream(input);
      const lexer = new KrrgScriptLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new KrrgScriptParser(tokenStream);

      const tree = parser.primaryExpression();

      const functions: Map<string, FunctionDeclarationContext> = new Map();

      const functionVisitor = new FunctionVisitor(functions, builtins);

      const result = functionVisitor.primaryExpression(tree);

      expect(result).toStrictEqual(expectedResult);
    });

    test("組み込み関数の呼び出し", () => {
      const input = '#くるるぎはっぴょうかい()';
      const expectedResult = 124;

      const builtins: BuiltinFunctions = new Map();
      builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
      builtins.set('#みるは〜と', (args: number[]) => { return 430; });

      const inputStream = new ANTLRInputStream(input);
      const lexer = new KrrgScriptLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new KrrgScriptParser(tokenStream);

      const tree = parser.functionCallExpression();

      const functions: Map<string, FunctionDeclarationContext> = new Map();

      const functionVisitor = new FunctionVisitor(functions, builtins);

      const result = functionVisitor.functionCallExpression(tree);

      expect(result).toStrictEqual(expectedResult);
    });

    test("式に括弧をつけることができる", () => {
      const input = '(#くるるぎはっぴょうかい())';
      const expectedResult = 124;

      const builtins: BuiltinFunctions = new Map();
      builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
      builtins.set('#みるは〜と', (args: number[]) => { return 430; });

      const inputStream = new ANTLRInputStream(input);
      const lexer = new KrrgScriptLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new KrrgScriptParser(tokenStream);

      const tree = parser.primaryExpression();

      const functions: Map<string, FunctionDeclarationContext> = new Map();

      const functionVisitor = new FunctionVisitor(functions, builtins);

      const result = functionVisitor.primaryExpression(tree);

      expect(result).toStrictEqual(expectedResult);
    });

    describe("unaryExpression", () => {
      const check = (label: string, input: string, expectedResult: number) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.unaryExpression();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.unaryExpression(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check("マイナス", "- #くるるぎはっぴょうかい()", -124);
      check("プラス", "+ #くるるぎはっぴょうかい()", 124);
      check("否定 1", "! #くるるぎはっぴょうかい()", 0);
      check("否定 2", "!! #くるるぎはっぴょうかい()", 1);
    });

    describe("multiplicativeExpression", () => {
      const check = (label: string, input: string, expectedResult: number) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.multiplicativeExpression();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.multiplicativeExpression(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check("掛け算 1", "#くるるぎはっぴょうかい() * #みるは〜と()", 124 * 430);
      check("掛け算 2", "#くるるぎはっぴょうかい() * #くるるぎはっぴょうかい()", 124 * 124);
      check("割り算 1", "#くるるぎはっぴょうかい() / #みるは〜と()", 0);
      check("割り算 2", "#みるは〜と() / #くるるぎはっぴょうかい()", 3);
      check("割り算 3", "#みるは〜と() / #みるは〜と()", 1);
      check("剰余算 1", "#くるるぎはっぴょうかい() % #みるは〜と()", 124);
      check("剰余算 2", "#みるは〜と() % #くるるぎはっぴょうかい()", 430 % 124);
    });

    describe("additiveExpression", () => {
      const check = (label: string, input: string, expectedResult: number) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.additiveExpression();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.additiveExpression(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check('足し算 1', '#くるるぎはっぴょうかい() + #みるは〜と()', 124 + 430);
      check('足し算 2', '#くるるぎはっぴょうかい() + #くるるぎはっぴょうかい()', 124 + 124);
      check('引き算 1', '#くるるぎはっぴょうかい() - #みるは〜と()', 124 - 430);
      check('引き算 2', '#みるは〜と() - #くるるぎはっぴょうかい()', 430 - 124);
    });

    describe("relationalExpression", () => {
      const check = (label: string, input: string, expectedResult: number) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.relationalExpression();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.relationalExpression(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check("比較 > true", "#みるは〜と() > #くるるぎはっぴょうかい()", 1);
      check("比較 > false", "#くるるぎはっぴょうかい() > #みるは〜と()", 0);
      check("比較 >= true", "#みるは〜と() >= #くるるぎはっぴょうかい()", 1);
      check("比較 >= true", "#みるは〜と() >= #みるは〜と()", 1);
      check("比較 >= false", "#くるるぎはっぴょうかい() >= #みるは〜と()", 0);
      check("比較 < true", "#くるるぎはっぴょうかい() < #みるは〜と()", 1);
      check("比較 < false", "#みるは〜と() < #くるるぎはっぴょうかい()", 0);
      check("比較 <= true", "#くるるぎはっぴょうかい() <= #みるは〜と()", 1);
      check("比較 <= true", "#みるは〜と() <= #みるは〜と()", 1);
      check("比較 <= false", "#みるは〜と() <= #くるるぎはっぴょうかい()", 0);
    });

    describe("equalityExpression", () => {
      const check = (label: string, input: string, expectedResult: number) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.equalityExpression();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.equalityExpression(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check("比較 == true", "#みるは〜と() == #みるは〜と()", 1);
      check("比較 == false", "#くるるぎはっぴょうかい() == #みるは〜と()", 0);
      check("比較 != true", "#くるるぎはっぴょうかい() != #みるは〜と()", 1);
      check("比較 != false", "#みるは〜と() != #みるは〜と()", 0);
    });

    describe("logicalAndExpression", () => {
      const check = (label: string, input: string, expectedResult: number) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.logicalAndExpression();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.logicalAndExpression(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check("論理積 true", "#みるは〜と() && #くるるぎはっぴょうかい()", 1);
      check("論理積 false", "(krrgmrh - krrgmrh) && #くるるぎはっぴょうかい()", 0);
      check("論理積 false", "(krrgmrh - krrgmrh) && (krrgmrh - krrgmrh)", 0);
    });

    describe("logicalOrExpression", () => {
      const check = (label: string, input: string, expectedResult: number) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.logicalOrExpression();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.logicalOrExpression(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check("論理和 true", "#みるは〜と() || #くるるぎはっぴょうかい()", 1);
      check("論理和 true", "(krrgmrh - krrgmrh) || #くるるぎはっぴょうかい()", 1);
      check("論理和 false", "(krrgmrh - krrgmrh) || (krrgmrh - krrgmrh)", 0);
    });

    describe("assignmentExpression", () => {
      const check = (label: string, input: string, expectedResult: number) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.assignmentExpression();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.assignmentExpression(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check("代入 1", "krrg_sub = #くるるぎはっぴょうかい()", 124);
      check("代入 2", "krrrg_sub = krrg_sub = #くるるぎはっぴょうかい()", 124);
    });
  });

  describe("statement", () => {
    describe("jumpStatement", () => {
      const check = (label: string, input: string, expectedResult: Result) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.jumpStatement();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.jumpStatement(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check("freeze 1", "freeze #くるるぎはっぴょうかい();", new Result(true, 124));
      check("freeze 2", "freeze #みるは〜と();", new Result(true, 430));
    });

    describe("compoundStatement", () => {
      const check = (label: string, input: string, expectedResult: Result) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.compoundStatement();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.compoundStatement(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check("returnあり", "{krrg_sub = #くるるぎはっぴょうかい(); freeze krrg_sub;freeze #みるは〜と();}", new Result(true, 124));
      check("returnなし", "{krrgmrh;krrgmrh;}", new Result(false));
    });

    describe("selectionStatement", () => {
      const check = (label: string, input: string, expectedResult: Result) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.selectionStatement();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.selectionStatement(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check("if 1", "if (krrgmrh - krrgmrh) {freeze #くるるぎはっぴょうかい();}", new Result(false));
      check("if 2", "if (!(krrgmrh - krrgmrh)) {freeze #くるるぎはっぴょうかい();}", new Result(true, 124));
      check("ifelse 1", "if (krrgmrh - krrgmrh) {freeze #くるるぎはっぴょうかい();} else {freeze #みるは〜と();}", new Result(true, 430));
      check("ifelse 2", "if (!(krrgmrh - krrgmrh)) {freeze #くるるぎはっぴょうかい();} else {freeze #みるは〜と();}", new Result(true, 124));
    });

    describe("whileStatement", () => {
      const check = (label: string, input: string, expectedResult: Result) => {
        test(label, () => {
          const builtins: BuiltinFunctions = new Map();
          builtins.set('#くるるぎはっぴょうかい', (args: number[]) => { return 124; });
          builtins.set('#みるは〜と', (args: number[]) => { return 430; });

          const inputStream = new ANTLRInputStream(input);
          const lexer = new KrrgScriptLexer(inputStream);
          const tokenStream = new CommonTokenStream(lexer);
          const parser = new KrrgScriptParser(tokenStream);

          const tree = parser.compoundStatement();

          const functions: Map<string, FunctionDeclarationContext> = new Map();

          const functionVisitor = new FunctionVisitor(functions, builtins);

          const result = functionVisitor.compoundStatement(tree);

          expect(result).toStrictEqual(expectedResult);
        });
      };
      check("while 1", "{krrg_sub = #くるるぎはっぴょうかい(); while (krrg_sub) {krrg_sub = krrg_sub - !(krrgmrh - krrgmrh);}}", new Result(false));
      check("while 1", "{krrg_sub = #くるるぎはっぴょうかい(); krg_sub = (krrgmrh - krrgmrh); while (krrg_sub) {krrg_sub = krrg_sub - !(krrgmrh - krrgmrh); krg_sub = krg_sub + krrg_sub} freeze krg_sub; }", new Result(true, 7626));
    });
  });

  describe("etc", () => {
    test("0を得る", () => {
      const input = 'krrgmrh - krrgmrh';
      const expectedResult = 0;

      const builtins: BuiltinFunctions = new Map();

      const inputStream = new ANTLRInputStream(input);
      const lexer = new KrrgScriptLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new KrrgScriptParser(tokenStream);

      const tree = parser.expression();

      const functions: Map<string, FunctionDeclarationContext> = new Map();

      const functionVisitor = new FunctionVisitor(functions, builtins);

      const result = functionVisitor.expression(tree);

      expect(result).toStrictEqual(expectedResult);
    });

    test("1を得る", () => {
      const input = '!(krrgmrh - krrgmrh)';
      const expectedResult = 1;

      const builtins: BuiltinFunctions = new Map();

      const inputStream = new ANTLRInputStream(input);
      const lexer = new KrrgScriptLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new KrrgScriptParser(tokenStream);

      const tree = parser.expression();

      const functions: Map<string, FunctionDeclarationContext> = new Map();

      const functionVisitor = new FunctionVisitor(functions, builtins);

      const result = functionVisitor.expression(tree);

      expect(result).toStrictEqual(expectedResult);
    });
  });
});
