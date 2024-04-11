import {strings, delimiterStrings} from './index';

describe('string merge methods are ok', () => {
    const str_1 = 'hello';
    const str_2 = 'false';
    const str_3 = false;
    const str_4 = [1, 2, {tt: true, cc: null}, undefined, 0, {xx: 5}];

    const result = ['hello', 'false', 1, 2, 'tt', 'xx'];
    const rightResult = result.join('');
    const delimiterResult = result.join(' ');
    const delimiterResult2 = result.join('@');

    it('should return a string', () => {
        expect(strings(str_1, str_2, str_3, str_4)).toBe(rightResult);
    });

    it('should return a delimiter string', () => {
        expect(delimiterStrings(' ')(str_1, str_2, str_3, str_4)).toBe(delimiterResult);
    });

    it('should return a delimiter @ string', () => {
        expect(delimiterStrings('@')(str_1, str_2, str_3, str_4)).toBe(delimiterResult2);
    });
});