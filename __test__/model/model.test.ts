import { isLambda, isBoundVariable } from "../../src/model/model";


describe('model correctly identifies expression types', () => {
  test('lambda', () => {
    const obj = {
      symbolType: 'lambda',
      variable: '',
      apply: null
    }
    expect(isLambda(obj)).toEqual(true);
    expect(isBoundVariable(obj)).toEqual(false);
  });

  test('bound variable', () => {
    const obj = {
      symbolType: 'boundVariable',
      variable: '',
      apply: null
    }
    expect(isLambda(obj)).toEqual(false);
    expect(isBoundVariable(obj)).toEqual(true);
  });
});
