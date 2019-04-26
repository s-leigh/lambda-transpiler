import handleInput from '../src/orchestrator';

console.log = jest.fn()

// These are essentially end-to-end tests
describe('orchestrator transforms raw lambda into JS', () => {

  describe('identity function', () => {
    test('without application', () => {
      const result = handleInput('lx.x', [])
      expect(result.toString()).toEqual('x => x');
    });

    test('with application', () => {
      const result = handleInput('lx.x', ['5'])
      expect(result).toEqual('5');
    });
  });

  describe('constant function', () => {
    test('without application', () => {
      const result = handleInput('lx.ly.x', [])
      expect(result.toString()).toEqual('x => y => x');
    });

    test('with application', () => {
      const result = handleInput('lx.ly.x', ['6', '7'])
      expect(result.toString()).toEqual('6');
    });
  });

});

describe('orchestrator handles bad input', () => {
  test('throws error when too many args are specified', () => {
    expect(() => handleInput('lx.x', ['1', '2'])).toThrow()
  })

  test('throws error when handed non-lambda expression', () => {
    expect(() => handleInput('notALambda', ['1'])).toThrow()
  })
})
