export function $(target: string | HTMLElement): HTMLElement | null {
    if (target instanceof HTMLElement) {
        return target;
    }
    return document?.querySelector(target);
}

export function setStyle(node: HTMLElement, style: Partial<Record<keyof CSSStyleDeclaration, string | null>>) {
    for (const key in style) {
        const value = style[key];
        if (value !== null && value !== undefined) {
            node.style[key] = value;
        }
    }
}