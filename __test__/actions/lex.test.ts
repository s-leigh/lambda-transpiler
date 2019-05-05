import lexer from '../../src/actions/lex';

describe('lexer splits strings into lexemes', () => {

  test('identity function with \'l\'', () => {
    expect(lexer('lx.x'))
      .toEqual(['lx.', 'x']);
  });

  test('identity function with \'λ\'', () => {
    expect(lexer('λx.x'))
      .toEqual(['λx.', 'x']);
  });

  test('K combinator / true', () => {
    expect(lexer('lx.ly.x'))
      .toEqual(['lx.', 'ly.', 'x']);
  });

  test('if', () => {
    expect(lexer('lx.ly.lz.x y z'))
      .toEqual(['lx.', 'ly.', 'lz.', 'x ', 'y ', 'z']);
  });

  test('omega combinator', () => {
    expect(lexer('lx.xx'))
      .toEqual(['lx.', 'x', 'x']);
  })

});
