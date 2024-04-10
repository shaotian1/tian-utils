export function getType(target: any): string {
    return Object.prototype.toString.call(target).slice(8, -1);
}

export function getObscureType(target: any): string {
    if (target instanceof HTMLElement) {
        return 'HTMLElement';
    }
    if (target instanceof Function) {
        return 'Function';
    }
    return getType(target);
}

export function hasOwnProperty(target: any, key: string): boolean {
    return Object.prototype.hasOwnProperty.call(target, key);
}

export function isAvailableKey(target: any, key: string) {
    return hasOwnProperty(target, key) && target[key] !== undefined && target[key] !== null;
}