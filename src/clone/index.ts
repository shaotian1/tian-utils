/* generated by 'bin/templateGenerate.js' */
import {getObscureType} from '../utils';
import {
    BasicType, ReferenceType, TMap,
    cloneDate, cloneRegExp, cloneHtmlElement,
    cloneFunction, cloneMap, cloneSet, cloneSymbol, cloneObject
} from './rules';

export function cloneDeep(target: any, map: TMap = new WeakMap()): ReturnType<typeof target> {
    const type: string = getObscureType(target);
    if (type in BasicType) return target;

    switch (type) {
        case ReferenceType.Date:
            return cloneDate(target);

        case ReferenceType.RegExp:
            return cloneRegExp(target);

        case ReferenceType.Symbol:
            return cloneSymbol(target);

        case ReferenceType.Function:
            return cloneFunction(target);

        case ReferenceType.HTMLElement:
            return cloneHtmlElement(target);

        case ReferenceType.Map:
            return cloneMap(target, map, cloneDeep);

        case ReferenceType.Set:
            return cloneSet(target, map, cloneDeep);

        case ReferenceType.Array:
            return cloneObject(target, type, map, cloneDeep);
        
        case ReferenceType.Object:
            return cloneObject(target, type, map, cloneDeep);

        default:
            return target;
    }
}

export function clone(target: any, map: TMap = new WeakMap()): ReturnType<typeof target> {
    const type: string = getObscureType(target);
    if (type in BasicType) return target;

    switch (type) {
        case ReferenceType.Array:
            return cloneObject(target, type, map, clone, 'shallow');
        
        case ReferenceType.Object:
            return cloneObject(target, type, map, clone, 'shallow');

        default:
            return target;
    }
}



