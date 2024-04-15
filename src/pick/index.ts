/* generated by 'bin/codeGen/templateGenerate.js' */
import {cloneDeep} from '../clone';

export function pick(target: object, ...keys: string[]): object {
    return keys.reduce((result, key) => {
        return result[key] = cloneDeep(target[key]), result;
    }, {});
}

export function omit(target: object, ...keys: string[]): object {
    const pickKeys = Object.keys(target).filter(key => !keys.includes(key));
    return pick(target, ...pickKeys);
}
