import {BOUND_VARIABLE, IExpression, LAMBDA, UNBOUND_VARIABLE} from './model/model';

export default (ast): IExpression => {
  const handleNode = (node, expression) => {
    if (node === null) return expression;

    const recurse = (newExpression): IExpression => handleNode(node.apply, expression.concat(newExpression));

    if (node.symbolType === LAMBDA) {
      return recurse(`(${node.variable} => `);
    }
    if (node.symbolType === BOUND_VARIABLE) {
      return recurse(`${node.variable})`);
    }
    if (node.symbolType === UNBOUND_VARIABLE) {
      return recurse(`(${node.variable})`);
    }
  };
  return handleNode(ast, '');
};
