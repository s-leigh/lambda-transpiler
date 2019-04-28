import lexer from '../../src/actions/lex';

describe('lexer splits strings into lexemes', () => {

  test('identity function', () => {
    expect(lexer('lx.x'))
      .toEqual(['lx.', 'x']);
  });

  test('K combinator / true', () => {
    expect(lexer('lx.ly.x'))
      .toEqual(['lx.', 'ly.', 'x']);
  });

  test('if', () => {
    expect(lexer('lx.ly.lz.x y z'))
      .toEqual(['lx.', 'ly.', 'lz.', 'x ', 'y ', 'z']);
  });

});
