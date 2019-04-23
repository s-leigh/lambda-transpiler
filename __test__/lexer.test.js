import lex from '../src/lexer';

describe('lexer splits strings into lexemes', () => {
    test('identity function', () => {
        expect(lex('lx.x')).toEqual(['l', 'x', '.', 'x'])
    })
});