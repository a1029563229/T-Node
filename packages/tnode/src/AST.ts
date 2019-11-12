export interface Node {
  type: string;
}
interface Expression extends Node { }
interface Statement extends Node { }

interface Identifier extends Expression {
  type: 'Identifier';
  name: string;
}

interface ExpressionStatement extends Statement {
  type: "ExpressionStatement";
  expression: Expression;
}

interface MemberExpression extends Expression {
  type: "MemberExpression";
  object: Expression;
  property: Expression;
  computed: boolean;
}

class AST {
  scope: any;
  ast: Node;

  constructor(scope: any, ast: Node) {
    this.scope = scope;
    this.ast = ast;
  }

  public execute(): string {
    const result = "AST Tree";
    return result;
  }
}

export default AST;