import transpiler from '../../src/actions/transpile';

describe('transpiler converts AST to JS', () => {

  test('identity function', () => {
    const result = transpiler({
      symbolType: 'lambda',
      variable: 'x',
      apply: {
        symbolType: 'boundVariable',
        variable: 'x',
        apply: null
      }
    });
    expect(result).toEqual('(x => x)');
  });

  test('constant function', () => {
    const result = transpiler({
      symbolType: 'lambda',
      variable: 'x',
      apply: {
        symbolType: 'lambda',
        variable: 'y',
        apply: {
          symbolType: 'boundVariable',
          variable: 'x',
          apply: null
        }
      }
    });
    expect(result).toEqual('(x => y => x)');
  });

});
