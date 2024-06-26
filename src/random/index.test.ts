/* generated by 'bin/codeGen/templateGenerate.js' */
import {random, randomFixed, randomInt, randomHexColor} from './index';

describe('random is ok', () => {
    it('random is less than 1', () => {
        expect(random()).toBeLessThan(1);
    });

    it('random is less than 5', () => {
        expect(random(1, 5)).toBeLessThan(5);
    });

    it('randomHexColor', () => {
        expect(randomHexColor()).toBeTruthy();
    });
});