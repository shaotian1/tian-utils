/* generated by 'bin/codeGen/templateGenerate.js' */
import {cache} from './index';

describe('cache function is ok!', () => {
    let number = 1;
    function add(x: number) {
        number += 1;
        return x;
    }

    const addCache = cache(add);

    addCache(number);

    it('should return 2', () => {
        expect(number).toBe(2);
    });

    it('should do not change', () => {
        addCache(1);
        expect(number).toBe(2);
    });

    it('should return 3', () => {
        addCache(number)
        expect(number).toBe(3);
    });

    it('should always not change', () => {
        addCache(2);
        addCache(2);
        expect(number).toBe(3);
    });
});