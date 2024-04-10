import {Enum} from './index';

describe('class enum is ok', () => {
    const a = {alias: 'a', text: 'aa', value: 0};
    const b = {alias: 'b', text: 'bb', value: 1};
    const c = {alias: 'c', text: 'cc', value: 2};
    const d = {alias: 'd', text: 'dd', value: 3};
    const e = {alias: 'e', text: 'ee', value: 4};

    const myEnum = new Enum(a, b, c);
    const array = [a, b, c];
    const obj = {0: 'aa', 1: 'bb', 2: 'cc'};

    it('should return value 0', () => {
        expect(myEnum.getValueFromAlias('a')).toBe(0);
        expect(myEnum.getValueFromText('aa')).toBe(0);
    });
    it('should return alias b', () => {
        expect(myEnum.getAliasFromText('bb')).toBe('b');
        expect(myEnum.getAliasFromValue(1)).toBe('b');
    });
    it('should return text cc', () => {
        expect(myEnum.getTextFromAlias('c')).toBe('cc');
        expect(myEnum.getTextFromValue(2)).toBe('cc');
    });


    it('should return 0', () => {
        expect(myEnum[a.alias]).toBe(0);
    });
    it('should return a', () => {
        expect(myEnum[a.value]).toBe('a');
    });


    it('should equal to array', () => {
        expect(myEnum.toArray()).toEqual(array);
    });
    it('should equal to obj', () => {
        expect(myEnum.toJson()).toEqual(obj);
    });


    it('should equal to array4', () => {
        const enum2 = new Enum(a, b, c);
        const array4 = [a, b, c, d];
        enum2.addItem(d);

        expect(enum2.toArray()).toEqual(array4);
    });
    it('should equal to array4', () => {
        const enum2 = new Enum(a, b, c);
        const obj5 = {0: 'aa', 1: 'bb', 2: 'cc', 3: 'dd', 4: 'ee'};
        enum2.addItem(d);
        enum2.addItem(e);

        expect(enum2.toJson()).toEqual(obj5);
    });

    it('should equal to fixObj', () => {
        const enum3 = new Enum(a, b, c);
        const allObj = {alias: 'ALL', text: 'all'};
        const fixObj = {alias: 'ALL', text: 'all', value: 3};
        // @ts-ignore
        enum3.addItem(allObj);

        expect(enum3.fromAlias('ALL')).toEqual(fixObj);
        expect(enum3[allObj.alias]).toBe(3);
    });
});