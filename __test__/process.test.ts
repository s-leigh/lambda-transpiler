import process from '../src/process';

describe('processor transforms raw lambda to JS', () => {

  test('identity function', () => {
    expect(process('lx.x (y)'))
      .toEqual('(x => x)(y)');
  });

  test('misc simple function', () => {
    expect(process('lx.y (z)'))
      .toEqual('(x => y)(z)');
  });

  test('curried functions', () => {
    expect(process('la.lb.c (x)'))
      .toEqual('(a => b => c)(x)');
  });

});
