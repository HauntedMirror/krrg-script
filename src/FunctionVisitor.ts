import { KrrgScriptVisitor } from '../dist/antlr/KrrgScriptVisitor';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { AdditiveExpressionContext, ArgumentExpressionListContext, AssignmentExpressionContext, CompoundStatementContext, EqualityExpressionContext, ExpressionContext, ExpressionStatementContext, FunctionCallExpressionContext, FunctionDeclarationContext, JumpStatementContext, LogicalAndExpressionContext, LogicalOrExpressionContext, MultiplicativeExpressionContext, PostfixExpressionContext, PrimaryExpressionContext, ProgramContext, RelationalExpressionContext, SelectionStatementContext, StatementContext, UnaryExpressionContext, WhileStatementContext } from '../dist/antlr/KrrgScriptParser';

import { UndefinedParseError } from './error/UndefinedParseError';
import { UnimplementedParseError } from './error/UnimplementedParseError';
import { InternalError } from './error/InternalError';
import { NameNotFoundError } from './error/NameNotFoundError';

import { BuiltinFunctions } from './ProgramVisitor';


function krrgmrh(date?: Date): number {
  const krrgDebutDate = new Date(2022, 4, 30);
  const now = date || new Date();
  const diff = now.getTime() - krrgDebutDate.getTime();
  return Math.floor(diff / (365 * 24 * 60 * 60 * 1000));
}

class Result {
  public readonly returned: boolean;
  public readonly value: number;
  constructor(returned: boolean, value?: number) {
    if (returned && value === undefined) {
      throw new InternalError();
    }
    this.returned = returned;
    this.value = value || 0;
  }
}



export class FunctionVisitor extends AbstractParseTreeVisitor<Result> implements KrrgScriptVisitor<Result> {
  private idMap: Map<string, number>;
  private functionMap: Map<string, FunctionDeclarationContext>;
  private builtin: BuiltinFunctions;
  constructor(functionMap: Map<string, FunctionDeclarationContext>, builtin: BuiltinFunctions) {
    super();
    this.idMap = new Map();
    this.functionMap = functionMap;
    this.builtin = builtin;
  }

  protected defaultResult(): Result {
    return new Result(false);
  }

  invoke(ctx: FunctionDeclarationContext, args: number[]): number {
    let i = 0;
    for (const id of ctx.argumentIdentifierList().VARIABLE_IDENTIFIER()) {
      this.idMap.set(id.text, args[i]);
    }
    return this.functionDeclaration(ctx).value;
  }

  functionDeclaration(ctx: FunctionDeclarationContext): Result {
    const result = this.compoundStatement(ctx.compoundStatement());
    if (result.returned) {
      return result;
    }
    return new Result(true, krrgmrh());
  }

  compoundStatement(ctx: CompoundStatementContext): Result {
    for (const statement of ctx.statement()) {
      const result = this.statement(statement);
      if (result.returned) {
        return result;
      }
    }
    return new Result(false);
  }

  statement(ctx: StatementContext): Result {
    const expressionStatement = ctx.expressionStatement();
    const selectionStatement = ctx.selectionStatement();
    const whileStatement = ctx.whileStatement();
    const jumpStatement = ctx.jumpStatement();
    if (expressionStatement) {
      return this.expressionStatement(expressionStatement);
    } else if (selectionStatement) {
      return this.selectionStatement(selectionStatement);
    } else if (whileStatement) {
      return this.whileStatement(whileStatement);
    } else if (jumpStatement) {
      return this.jumpStatement(jumpStatement);
    }
    throw new UndefinedParseError(ctx.start.line);
  }

  expressionStatement(ctx: ExpressionStatementContext): Result {
    return new Result(false, this.expression(ctx.expression()));
  }

  selectionStatement(ctx: SelectionStatementContext): Result {
    const cond = this.expression(ctx.expression());
    if (cond != 0) {
      return this.compoundStatement(ctx.compoundStatement(0));
    }
    if (ctx.ELSE()) {
      return this.compoundStatement(ctx.compoundStatement(1));
    }
    return new Result(false);
  }

  whileStatement(ctx: WhileStatementContext): Result {
    let result = new Result(false);
    while (true) {
      if (this.expression(ctx.expression()) == 0) {
        return result;
      }
      result = this.compoundStatement(ctx.compoundStatement());
    }
  }

  jumpStatement(ctx: JumpStatementContext): Result {
    return new Result(true, this.expression(ctx.expression()));
  }

  expression(ctx: ExpressionContext): number {
    return this.assignmentExpression(ctx.assignmentExpression());
  }

  assignmentExpression(ctx: AssignmentExpressionContext): number {
    const op = ctx.ASSIGNMENT_OPERATOR();
    if (op) {
      if (op.text == '=') {
        const expression = ctx.expression();
        const id = ctx.VARIABLE_IDENTIFIER();
        const value = expression ? this.expression(expression) : 0;
        this.idMap.set(id ? id.text : '', value);
        return value;
      } else {
        throw new UnimplementedParseError(ctx.start.line, op.text);
      }
    }
    const logicalOrExpression = ctx.logicalOrExpression();
    return logicalOrExpression ? this.logicalOrExpression(logicalOrExpression) : 0;
  }

  logicalOrExpression(ctx: LogicalOrExpressionContext): number {
    const op = ctx.LOGICAL_OR_OPERATOR();
    if (op) {
      if (op.text == '||') {
        const logicalOrExpression = ctx.logicalOrExpression();
        const left = logicalOrExpression ? this.logicalOrExpression(logicalOrExpression) : 0;
        const right = this.logicalAndExpression(ctx.logicalAndExpression());
        const result = (left !== 0) || (right !== 0);
        return result ? 1 : 0;
      } else {
        throw new UnimplementedParseError(ctx.start.line, op.text);
      }
    }
    return this.logicalAndExpression(ctx.logicalAndExpression());
  }

  logicalAndExpression(ctx: LogicalAndExpressionContext): number {
    const op = ctx.LOGICAL_AND_OPERATOR();
    if (op) {
      const logicalAndExpression = ctx.logicalAndExpression();
      const left = logicalAndExpression ? this.logicalAndExpression(logicalAndExpression) : 0;
      const right = this.equalityExpression(ctx.equalityExpression());
      if (op.text == '&&') {
        const result = (left !== 0) && (right !== 0);
        return result ? 1 : 0;
      } else {
        throw new UnimplementedParseError(ctx.start.line, op.text);
      }
    }
    return this.equalityExpression(ctx.equalityExpression());
  }

  equalityExpression(ctx: EqualityExpressionContext): number {
    const op = ctx.EQUALITY_OPERATOR();
    if (op) {
      const equalityExpression = ctx.equalityExpression();
      const left = equalityExpression ? this.equalityExpression(equalityExpression) : 0;
      const right = this.relationalExpression(ctx.relationalExpression());
      if (op.text == '==') {
        const result = left === right;
        return result ? 1 : 0;
      } else if (op.text == '!=') {
        const result = left !== right;
        return result ? 1 : 0;
      } else {
        throw new UnimplementedParseError(ctx.start.line, op.text);
      }
    }
    return this.relationalExpression(ctx.relationalExpression());
  }

  relationalExpression(ctx: RelationalExpressionContext): number {
    const op = ctx.RELATIONAL_OPERATOR();
    if (op) {
      const relationalExpression = ctx.relationalExpression();
      const left = relationalExpression ? this.relationalExpression(relationalExpression) : 0;
      const right = this.additiveExpression(ctx.additiveExpression());
      if (op.text == '<') {
        const result = left < right;
        return result ? 1 : 0;
      } else if (op.text == '<=') {
        const result = left <= right;
        return result ? 1 : 0;
      } else if (op.text == '>') {
        const result = left > right;
        return result ? 1 : 0;
      } else if (op.text == '>=') {
        const result = left >= right;
        return result ? 1 : 0;
      } else {
        throw new UnimplementedParseError(ctx.start.line, op.text);
      }
    }
    return this.additiveExpression(ctx.additiveExpression());
  }

  additiveExpression(ctx: AdditiveExpressionContext): number {
    const op = ctx.ADDITIVE_OPERATOR();
    if (op) {
      const additiveExpression = ctx.additiveExpression();
      const left = additiveExpression ? this.additiveExpression(additiveExpression) : 0;
      const right = this.multiplicativeExpression(ctx.multiplicativeExpression());
      if (op.text == '+') {
        return left + right;
      } else if (op.text == '-') {
        return left - right;
      } else {
        throw new UnimplementedParseError(ctx.start.line, op.text);
      }
    }
    return this.multiplicativeExpression(ctx.multiplicativeExpression());
  }

  multiplicativeExpression(ctx: MultiplicativeExpressionContext): number {
    const op = ctx.MULTIPLICATIVE_OPERATOR();
    if (op) {
      const multiplicativeExpression = ctx.multiplicativeExpression();
      const left = multiplicativeExpression ? this.multiplicativeExpression(multiplicativeExpression) : 0;
      const right = this.unaryExpression(ctx.unaryExpression());
      if (op.text == '*') {
        return left * right;
      } else if (op.text == '/') {
        return left / right;
      } else if (op.text == '%') {
        return left % right;
      } else {
        throw new UnimplementedParseError(ctx.start.line, op.text);
      }
    }
    return this.unaryExpression(ctx.unaryExpression());
  }

  unaryExpression(ctx: UnaryExpressionContext): number {
    const op = ctx._op;
    if (op) {
      const unaryExpression = ctx.unaryExpression();
      const value = unaryExpression ? this.unaryExpression(unaryExpression) : 0;
      if (op.text == '+') {
        return + value;
      } else if (op.text == '-') {
        return - value;
      } else if (op.text == '!') {
        return (value == 0) ? 1 : 0;
      } else {
        throw new UnimplementedParseError(ctx.start.line, op.text || '');
      }
    }

    const postfixExpression = ctx.postfixExpression();
    return postfixExpression ? this.postfixExpression(postfixExpression) : 0;
  }

  postfixExpression(ctx: PostfixExpressionContext): number {
    const primaryExpression = ctx.primaryExpression();
    const functionCallExpression = ctx.functionCallExpression();
    if (primaryExpression) {
      return this.primaryExpression(primaryExpression);
    } else if (functionCallExpression) {
      return this.functionCallExpression(functionCallExpression);
    }
    throw new UndefinedParseError(ctx.start.line);
  }

  primaryExpression(ctx: PrimaryExpressionContext): number {
    const KRRGMRH = ctx.KRRGMRH();
    const VARIABLE_IDENTIFIER = ctx.VARIABLE_IDENTIFIER();
    const parenExpression = ctx.expression();
    if (KRRGMRH) {
      return krrgmrh();
    } else if (VARIABLE_IDENTIFIER) {
      const value = this.idMap.get(VARIABLE_IDENTIFIER.text);
      return value ? value : 0;
    } else if (parenExpression) {
      return this.expression(parenExpression);
    }
    throw new UndefinedParseError(ctx.start.line);
  }

  functionCallExpression(ctx: FunctionCallExpressionContext): number {
    const FUNCTION_IDENTIFIER = ctx.FUNCTION_IDENTIFIER();
    const BUILTIN_FUNCTION = ctx.BUILTIN_FUNCTION();
    if (FUNCTION_IDENTIFIER) {
      const name = FUNCTION_IDENTIFIER.text;
      const args = this.argumentExpressionList(ctx.argumentExpressionList());
      const func = this.functionMap.get(name);
      if (!func) {
        throw new NameNotFoundError(ctx.start.line, name);
      }
      const visitor = new FunctionVisitor(this.functionMap, this.builtin);
      visitor.invoke(func, args);
    } else if (BUILTIN_FUNCTION) {
      const args = this.argumentExpressionList(ctx.argumentExpressionList());
      // 抽象化したい
      const name = BUILTIN_FUNCTION.text;
      const func = this.builtin.get(name);
      if (!func) {
        throw new NameNotFoundError(ctx.start.line, name);
      }
      return func(args);
    }
    throw new UndefinedParseError(ctx.start.line);
  }

  argumentExpressionList(ctx: ArgumentExpressionListContext): number[] {
    let args: number[] = [];
    for (const argExpression of ctx.expression()) {
      args.push(this.expression(argExpression));
    }
    return args;
  }
}
