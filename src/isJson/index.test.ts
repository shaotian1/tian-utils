import {isJson} from './index';

describe('isJson method is ok', () => {
    const obj = {a: 1, b: 2};
    const json = JSON.stringify(obj);

    it('is not json', () => {
        expect(isJson(obj)).toBeFalsy();
    });

    it('should return parse result', () => {
        expect(isJson(json)).toBeTruthy();
        expect(isJson(json)).toEqual(obj);
    });
});