import parser from '../src/parser';

describe('parser converts lexemes to objects', () => {
  test('identity function', () => {
    const result = parser(['lx.', 'x ' , '(y)']);
    // must stringify because matchers can't handle matching Symbols
    expect(JSON.stringify(result))
      .toEqual(JSON.stringify(
        [
          {variable: {val: 'x'}, succeedingToken: Symbol('apply')},
          {val: 'x'},
          {val: 'y'},
        ]
      ))
  });
});
