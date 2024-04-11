/* generated by 'bin/templateGenerate.js' */
import {getType} from '../utils';

type TArgvs = Array<any>;
type TStringCollect = Array<string>;
type TMergeStrings = (...argvs: TArgvs) => string;

export function delimiterStrings(delimiter: string = ''): TMergeStrings {
    return function mergeStrings(...argvs) {
        const stringCollect: TStringCollect = [];

        argvs.forEach(item => {
            const type = getType(item);

            switch (type) {
                case 'Array':
                    const result = delimiterStrings(delimiter)(...item);
                    result && stringCollect.push(result);
                    break;

                case 'Object':
                    Object.entries(item).forEach(entry => {
                        const [key, value] = entry;
                        Boolean(value) && stringCollect.push(key);
                    });
                    break;
            
                default:
                    const flag = Boolean(item);
                    flag && stringCollect.push(String(item));
                    break;
            }
        });

        return stringCollect.join(delimiter);
    }
}

export function strings(...argvs: TArgvs): string {
    return delimiterStrings('')(...argvs);
}

