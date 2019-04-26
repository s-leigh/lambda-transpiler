import lexer from '../src/actions/lexer';

describe('lexer splits strings into lexemes', () => {
  test('identity function', () => {
    expect(lexer('lx.x (y)'))
      .toEqual(['lx.', 'x ', '(y)'])
  })
});
