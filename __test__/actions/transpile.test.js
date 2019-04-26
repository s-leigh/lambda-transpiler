import transpiler from '../../src/actions/transpile';

describe('transpiler converts AST to JS', () => {
  test('identity function', () => {
    const result = transpiler({
      symbolType: 'lambda',
      variable: 'x',
      apply: {
        symbolType: 'boundVariable',
        variable: 'x',
        apply: {
          symbolType: 'unboundVariable',
          variable: 'y',
          apply: null
        }
      }
    });
    expect(result).toEqual('(x => x)(y)')
  });
});