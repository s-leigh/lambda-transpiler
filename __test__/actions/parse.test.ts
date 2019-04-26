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

  test('constant function', () => {
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

});
