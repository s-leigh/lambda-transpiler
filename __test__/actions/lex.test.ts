import lexer from '../../src/actions/lex';

describe('lexer splits strings into lexemes', () => {

  test('identity function', () => {
    expect(lexer('lx.x'))
      .toEqual(['lx.', 'x']);
  });

  test('constant function', () => {
    expect(lexer('lx.ly.x'))
      .toEqual(['lx.', 'ly.', 'x']);
  });

});
