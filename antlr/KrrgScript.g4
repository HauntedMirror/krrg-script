grammar KrrgScript;

program: functionDeclaration*;

functionDeclaration: name=FUNCTION_IDENTIFIER argumentIdentifierList compoundStatement;

argumentIdentifierList
    : '(' ')'
    | '(' VARIABLE_IDENTIFIER (',' VARIABLE_IDENTIFIER)* ')'
    ;

argumentExpressionList
    : '(' ')'
    | '(' expression (',' expression)* ')'
    ;

compoundStatement: '{' statement* '}';

statement
    : expressionStatement
    | selectionStatement
    | whileStatement
    | jumpStatement
    | emptyStatement
    ;

expressionStatement: expression ';';

selectionStatement
    : IF '(' expression ')' compoundStatement
    | IF '(' expression ')' compoundStatement ELSE compoundStatement
    ;

whileStatement: WHILE '(' expression ')' compoundStatement;

jumpStatement: FREEZE expression ';';

emptyStatement: ';';

expression: assignmentExpression;

assignmentExpression
    : logicalOrExpression
    | VARIABLE_IDENTIFIER ASSIGNMENT_OPERATOR expression
    ;

logicalOrExpression
    : logicalAndExpression
    | logicalOrExpression LOGICAL_OR_OPERATOR logicalAndExpression
    ;

logicalAndExpression
    : equalityExpression
    | logicalAndExpression LOGICAL_AND_OPERATOR equalityExpression
    ;

equalityExpression
    : relationalExpression
    | equalityExpression EQUALITY_OPERATOR relationalExpression
    ;

relationalExpression
    : additiveExpression
    | relationalExpression RELATIONAL_OPERATOR additiveExpression
    ;

additiveExpression
    : multiplicativeExpression
    | additiveExpression ADDITIVE_OPERATOR multiplicativeExpression
    ;

multiplicativeExpression
    : unaryExpression
    | multiplicativeExpression MULTIPLICATIVE_OPERATOR unaryExpression
    ;

unaryExpression
    : postfixExpression
    | op=(ADDITIVE_OPERATOR | '!') unaryExpression // AdditiveとLexerが被っちゃうの悲しいね
    ;

postfixExpression
    : primaryExpression
    | functionCallExpression
    ;

functionCallExpression
    : FUNCTION_IDENTIFIER argumentExpressionList
    | BUILTIN_FUNCTION argumentExpressionList
    ;

primaryExpression
    : KRRGMRH
    | VARIABLE_IDENTIFIER
    | '(' expression ')'
    ;

IF: 'if';

ELSE: 'else';

WHILE: 'while';

FREEZE: 'freeze';

ASSIGNMENT_OPERATOR: '=';

LOGICAL_OR_OPERATOR: '||';
LOGICAL_AND_OPERATOR: '&&';

EQUALITY_OPERATOR: '==' | '!=';
RELATIONAL_OPERATOR: '<' | '>' | '<=' | '>=';

ADDITIVE_OPERATOR: '+' | '-';
MULTIPLICATIVE_OPERATOR: '*' | '/' | '%';

VARIABLE_IDENTIFIER: 'k' 'r'+ 'g_sub';

FUNCTION_IDENTIFIER: 'k' 'r'+ 'g_mrh';

KRRGMRH: 'krrgmrh';

BUILTIN_FUNCTION: '#くるるぎはっぴょうかい' | '#みるは〜と'; // ここに書くことじゃない気はする

WS: [ \t\r\n]+ -> skip;

BlockComment
    : '/*' .*? '*/' -> skip
    ;
LineComment
    : '//' ~( '\r' | '\n' )* -> skip
    ;
