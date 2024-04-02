export function getType(target: any): string {
    return Object.prototype.toString.call(target).slice(8, -1);
}

export function hasOwnProperty(target: any, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(target, key);
}