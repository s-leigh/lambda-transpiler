import process from '../src/process';

describe('processor transforms raw lambda to JS', () => {

  test('identity function', () => {
    expect(process('lx.x'))
      .toEqual('(x => x)');
  });

  test('constant function', () => {
    expect(process('lx.ly.x'))
      .toEqual('(x => y => x)');
  });

});
