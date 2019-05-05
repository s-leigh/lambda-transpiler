import {IExpression, isLambda, isBoundVariable} from '../model/model';

export default function transpile(astNode: IExpression | null, expression: string = ''): Function {
  if (astNode === null) return eval(expression);

  const recurse = (newExpression: string): Function => transpile(astNode.apply, expression.concat(newExpression));

  if (isLambda(astNode)) return recurse(`${astNode.variable} => `);
  if (isBoundVariable(astNode)) return recurse(`(${astNode.variable})`);
  throw new Error(`Unknown symbol type ${astNode.symbolType}`);
};
