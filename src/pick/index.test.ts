/* generated by 'bin/codeGen/templateGenerate.js' */
import {pick, omit} from './index';

describe('pick omit is ok', () => {
    const date = new Date();
    const obj = {
        a: 1,
        b: {c: 2, d: 5},
        e: [{f: date}, 6]
    }
    const pickA = pick(obj, 'a');
    const omitB = omit(obj, 'b');

    obj.a = 22222;
    obj.e[1] = 99999;

    it('pick is ok', () => {
        expect(pickA).toEqual({a: 1});
    })

    it('omit is ok', () => {
        expect(pickA).toEqual({a: 1});
        expect(omitB).toEqual({a: 1, e: [{f: date}, 6]});
    })
});