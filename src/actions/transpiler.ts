import {BOUND_VARIABLE, IExpression, LAMBDA, UNBOUND_VARIABLE} from '../model/model';

export default (ast: IExpression): string => {
  const handleNode = (node: IExpression | null, expression: string): string => {
    if (node === null) return expression;

    const recurse = (newExpression: string): string => handleNode(node.apply, expression.concat(newExpression));

    if (node.symbolType === LAMBDA) {
      return recurse(`(${node.variable} => `);
    }
    if (node.symbolType === BOUND_VARIABLE) {
      return recurse(`${node.variable})`);
    }
    if (node.symbolType === UNBOUND_VARIABLE) {
      return recurse(`(${node.variable})`);
    }
    throw new Error(`Unknown symbol type ${node.symbolType}`);
  };
  return handleNode(ast, '');
};
