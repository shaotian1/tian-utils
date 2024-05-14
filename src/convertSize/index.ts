/* generated by 'bin/codeGen/templateGenerate.js' */

type Units = Array<string>;
type ConvertResult = number | Error;
type ConversionProcessFunction = (size: number, fromUnit: string, toUnit: string) => ConvertResult;
type CustomConvertFunction = (intervalSize: number, units: Units) => ConversionProcessFunction;

const defaultUnits: Units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

/**
 * 自定义转换函数
 *
 * @param intervalSize 单位间隔大小
 * @param units 单位数组，默认为 ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
 * @returns 返回一个转换函数，用于将指定大小从源单位转换为目标单位
 */
export const customConvert: CustomConvertFunction = (intervalSize, units = defaultUnits) => {
    const formatUnits = units.map(unit => unit.toUpperCase());

    return function conversionProcess(size, fromUnit, toUnit) {
        const sizeNumber = Number(size);
        const fromIndex = formatUnits.indexOf(fromUnit.toUpperCase());
        const toIndex = formatUnits.indexOf(toUnit.toUpperCase());
    
        if (fromIndex === -1 || toIndex === -1) {
            throw new Error(`Invalid unit: ${fromUnit} or ${toUnit}`);
        }
    
        const bytes = sizeNumber * Math.pow(intervalSize, fromIndex - toIndex);
        return bytes;
    }
}

export function convertSize(size: string | number, fromUnit: string, toUnit: string): ConvertResult {
    return customConvert(1024, defaultUnits)(Number(size), fromUnit, toUnit);
}