import {clone, cloneDeep} from './index';

describe('clone methods are ok', () => {
    const obj = {
        a: 1,
        b: false,
        c: null,
        d: undefined,
        e: Date.now(),
        f: /eea/,
        g: {tt: 1, xx: 0},
        h: ['cc', {ww: 1}, [2, 4], [{vv: 1}, 6]],
        i: document.createElement('div')
    }
    const copyObj = clone(obj);
    const copyDeepObj = cloneDeep(obj);

    it('copyObj and copyDeepObj should equal to obj', () => {
        expect(copyObj).toEqual(obj);
        expect(copyDeepObj).toEqual(obj);
    });

    it('modify obj', () => {
        // @ts-ignore
        obj.g.new = 3;
        // @ts-ignore
        obj.h[4] = 999;
        expect(copyObj.g.new).toBe(3);
        expect(copyDeepObj).not.toEqual(obj);
        expect(copyDeepObj.g.new).toBeUndefined();
    });
});