import {hasOwnProperty} from '../utils';

export enum BasicType {
    Null = 'Null',
    BigInt = 'BigInt',
    String = 'String',
    Number = 'Number',
    Boolean = 'Boolean',
    Undefined = 'Undefined'
}

export enum ReferenceType {
    Set = 'Set',
    Map = 'Map',
    Date = 'Date',
    Array = 'Array',
    Object = 'Object',
    Symbol = 'Symbol', // Symbol 基础类型，这里当作引用类型处理
    RegExp = 'RegExp',
    Function = 'Function',
    HTMLElement = 'HTMLElement'
}

export type TObjectTarget = Object | any[];
export type TObjectTypeString = 'Object' | 'Array';
export type TMap = undefined | null | WeakMap<any, any>;

export function cloneDate(target: Date): Date {
    return new Date(target);
}

export function cloneRegExp(target: RegExp): RegExp {
    return new RegExp(target.source, target.flags);
}

export function cloneHtmlElement(target: HTMLElement): HTMLElement {
    return target.cloneNode(true) as HTMLElement;
}

export function cloneFunction(target: Function): Function {
    const stringFunction = target.toString();
    return new Function('return' + stringFunction)();
}

export function cloneMap(target: Map<any, any>, map: TMap, originFn: Function): Map<any, any> {
    const newMap = new Map();
    target.forEach((value: any, key: any) => {
        newMap.set(originFn(key, map), originFn(value, map));
    });
    return newMap;
}

export function cloneSet(target: Set<any>, map: TMap, originFn: Function): Set<any> {
    const newSet = new Set();
    target.forEach((value: any) => {
        newSet.add(originFn(value, map));
    });
    return newSet;
}

export function cloneSymbol(target: symbol): symbol {
    // 全局Symbol Symbol.for('key')
    const symbolKey = Symbol.keyFor(target);
    if (symbolKey) {
        return Symbol.for(symbolKey);
    }

    // 自定义Symbol Symbol('key')
    const description = target.description;
    if (description) {
        return Symbol(description);
    }

    return Symbol();
}

export function cloneObject(target: TObjectTarget, type: TObjectTypeString, map: TMap, originFn: Function, shallow?: 'shallow'): TObjectTarget {
    if (map?.get(target)) {
        return map.get(target);
    }

    const result = type === 'Object' ? {} : [];

    for (let key in target) {
        const originValue = Reflect.get(target, key);
        const copyValue = shallow ? originValue : originFn(originValue, map)
        hasOwnProperty(target, key) && Reflect.set(result, key, copyValue);
    }
    map?.set(target, result);
    return result;
}