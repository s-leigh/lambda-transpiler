import handleInput from '../src/orchestrator';

console.log = jest.fn()

// These are essentially end-to-end tests
describe('orchestrator transforms raw lambda into JS', () => {

  describe('identity function', () => {
    test('without application', () => {
      const result = handleInput('lx.x', []);
      expect(result.toString()).toEqual('x => (x)');
    });

    test('with application', () => {
      const result = handleInput('lx.x', ['5']);
      expect(result).toEqual('5');
    });
  });

  describe('K combinator / true', () => {
    test('without application', () => {
      const result = handleInput('lx.ly.x', []);
      expect(result.toString()).toEqual('x => y => (x)');
    });

    test('with application', () => {
      const result = handleInput('lx.ly.x', ['6', '7']);
      expect(result.toString()).toEqual('6');
    });
  });

  describe('false', () => {
    test('without application', () => {
      const result = handleInput('lx.ly.y', []);
      expect(result.toString()).toEqual('x => y => (y)');
    });

    test('with application', () => {
      const result = handleInput('lx.ly.y', ['3', '4']);
      expect(result.toString()).toEqual('4');
    });
  })

  describe('if', () => {
    test('without application', () => {
      const result = handleInput('lx.ly.lz.x y z', []);
      expect(result.toString()).toEqual('x => y => z => (x)(y)(z)');
    });

    test('with application', () => {
      // @ts-ignore
      const result: Function = handleInput('lx.ly.lz.x y z', []);
      // @ts-ignore
      expect(result(x => y => x)('yarp')('narp')).toEqual('yarp');
      // @ts-ignore
      expect(result(x => y => y)('yarp')('narp')).toEqual('narp');
    });
  })

});

describe('orchestrator handles bad input', () => {
  test('throws error when too many args are specified', () => {
    expect(() => handleInput('lx.x', ['1', '2'])).toThrow()
  })

  test('throws error when handed non-lambda expression', () => {
    expect(() => handleInput('notALambda', ['1'])).toThrow()
  })
})
