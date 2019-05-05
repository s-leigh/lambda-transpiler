import {IExpression, isLambda, isBoundVariable} from '../model/model';

const lambdaTranspiler = (astNode: IExpression) => `${astNode.variable} => `;
const boundVariableTranspiler = (astNode: IExpression) => `(${astNode.variable})`;

export default function transpile(astNode: IExpression | null, expression: string = ''): Function {
  if (astNode === null) return eval(expression);

  const recurse = (newExpression: string) => transpile(astNode.apply, expression.concat(newExpression));

  if (isLambda(astNode)) return recurse(lambdaTranspiler(astNode));
  if (isBoundVariable(astNode)) return recurse(boundVariableTranspiler(astNode));
  throw new Error(`Unknown symbol type ${astNode.symbolType}`);
};
