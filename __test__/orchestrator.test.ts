import handleInput from '../src/orchestrator';

console.log = jest.fn()

// These are essentially end-to-end tests
describe('orchestrator transforms raw lambda into JS', () => {

  const SIMPLE_TEST_DATA: any = {
    identityFunction: {
      'lx.x': [
        [[], 'x => (x)'],
        [['5'], '5']
      ]
    },
    kCombinatorTrue: {
      'lx.ly.x': [
        [[], 'x => y => (x)'],
        [['6', '7'], '6']
      ]
    },
    falseCombinator: {
      'lx.ly.y': [
        [[], 'x => y => (y)'],
        [['6', '7'], '7']
      ]
    },
    ifCombinator: {
      'lx.ly.lz.x y z': [
        [[], 'x => y => z => (x)(y)(z)'],
      ]
    },
    omegaCombinator: {
      'lx.xx': [
        [[], 'x => (x)(x)']
      ]
    }
  };

  describe('Simple tests', () => {
    Object.keys(SIMPLE_TEST_DATA).forEach((exprName: string) => {
      Object.keys(SIMPLE_TEST_DATA[exprName]).forEach((primaryInput: string) => {
         SIMPLE_TEST_DATA[exprName][primaryInput].forEach((testCase: string[][]) => {
           const args = testCase[0];
           const expectedResult = testCase[1];
          test(`${exprName} ${primaryInput} ${args} === ${expectedResult}`, () => {
            expect(handleInput(primaryInput, args).toString()).toEqual(testCase[1]);
          });
        });
      });
    });
  });

  test('if combinator with application', () => {
    // @ts-ignore
    const result: Function = handleInput('lx.ly.lz.x y z', []);
    // @ts-ignore
    expect(result(x => y => x)('yarp')('narp')).toEqual('yarp');
    // @ts-ignore
    expect(result(x => y => y)('yarp')('narp')).toEqual('narp');
  });

});

describe('orchestrator handles bad input', () => {
  test('throws error when too many args are specified', () => {
    expect(() => handleInput('lx.x', ['1', '2'])).toThrow();
  });

  test('throws error when handed non-lambda expression', () => {
    expect(() => handleInput('notALambda', ['1'])).toThrow();
  });
})
