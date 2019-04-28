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
    expect(result.toString()).toEqual('x => (x)');
  });

  test('K combinator / true', () => {
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
    expect(result.toString()).toEqual('x => y => (x)');
  });

  test('if', () => {
    const result = transpiler({
      symbolType: 'lambda',
      variable: 'x',
      apply: {
        symbolType: 'lambda',
        variable: 'y',
        apply: {
          symbolType: 'lambda',
          variable: 'z',
          apply: {
            symbolType: 'boundVariable',
            variable: 'x',
            apply: {
              symbolType: 'boundVariable',
              variable: 'y',
              apply: {
                symbolType: 'boundVariable',
                variable: 'z',
                apply: null
              }
            }
          }
        }
      }
    });
    expect(result.toString()).toEqual('x => y => z => (x)(y)(z)');
  });

});
