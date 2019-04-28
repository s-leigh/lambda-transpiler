import parser from '../../src/actions/parse';

describe('parser converts lexemes to objects', () => {

  test('identity function', () => {
    const result = parser(['lx.', 'x']);
    expect(result).toEqual({
      symbolType: 'lambda',
      variable: 'x',
      apply: {
        symbolType: 'boundVariable',
        variable: 'x',
        apply: null
      }
    });
  });

  test('K combinator / true', () => {
    const result = parser(['lx.', 'ly.', 'x']);
    expect(result).toEqual({
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
  });

  test('if', () => {
    const result = parser(['lx.', 'ly.', 'lz.', 'x ', 'y ', 'z']);
    expect(result).toEqual({
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
  });

});
