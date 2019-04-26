import process from '../src/process';

describe('processor transforms raw lambda to JS', () => {
    test('identity function', () => {
        expect(process('lx.x (y)'))
            .toEqual('(x => x)(y)');
    });
});
