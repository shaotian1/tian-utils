import {chunk} from './index';

describe('chunk method is ok', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const mock2Result = [[1, 2], [3, 4], [5, 6], [7]];
    const chunk7 = [[1], [2], [3], [4], [5], [6], [7]];
    const ouofRange = [[1, 2, 3, 4, 5, 6, 7]];

    it('should return array like mock2Result', () => {
        expect(chunk(arr, 2)).toEqual(mock2Result);
    });

    it('should return array length 7', () => {
        const res = chunk(arr, 1);
        expect(res).toEqual(chunk7);
        expect(res.length).toEqual(7);
    });

    it('should return array like chunk7', () => {
        expect(chunk(arr, 7)).toEqual(ouofRange);
    });

    test('chunk out of range should return array like chunk7', () => {
        expect(chunk(arr, 8)).toEqual(ouofRange);
        expect(chunk(arr, 9)).toEqual(ouofRange);
        expect(chunk(arr, 10)).toEqual(ouofRange);
    });
});