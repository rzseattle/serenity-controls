export const deepCopy = (obj: any) => {
    return x(Array.isArray(obj) ? [] : {}, obj);
};

export const deepIsEqual = (a: any, b: any, ignoreFunctions: boolean = false) => {
    if (a === b) {
        return true;
    }

    const arrA: boolean = Array.isArray(a);
    const arrB: boolean = Array.isArray(b);
    let i;

    if (arrA && arrB) {
        if (a.length != b.length) {
            return false;
        }
        for (i = 0; i < a.length; i++) {
            if (!deepIsEqual(a[i], b[i], ignoreFunctions)) {
                return false;
            }
        }
        return true;
    }

    if (arrA != arrB) {
        return false;
    }

    if (a && b && typeof a === "object" && typeof b === "object") {
        const keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length) {
            return false;
        }

        const dateA: any = a instanceof Date;
        const dateB = b instanceof Date;
        if (dateA && dateB) {
            return a.getTime() == b.getTime();
        }
        if (dateA != dateB) {
            return false;
        }
        const regexpA: any = a instanceof RegExp;
        const regexpB = b instanceof RegExp;
        if (regexpA && regexpB) {
            return a.toString() == b.toString();
        }
        if (regexpA != regexpB) {
            return false;
        }

        for (i = 0; i < keys.length; i++) {
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
                return false;
            }
        }

        for (i = 0; i < keys.length; i++) {
            if (!deepIsEqual(a[keys[i]], b[keys[i]], ignoreFunctions)) {
                return false;
            }
        }
        return true;
    }

    if (typeof a === "function" && typeof b === "function" && ignoreFunctions) {
        return true;
    }

    return false;
};

function x(clone: any, obj: any) {
    for (const i in obj) {
        clone[i] = typeof obj[i] == "object" && obj[i] !== null ? x(obj[i].constructor(), obj[i]) : obj[i];
    }
    return clone;
}

export function deepExtend(target: any, source: any) {
    Object.keys(source).forEach((key) => {
        const value = source[key];
        const dest = target[key];
        const sourceType = typeof value;
        const destType = typeof target[key];

        if (Array.isArray(value) && Array.isArray(dest)) {
            target[key] = dest.concat(value);
        } else if (sourceType === destType && sourceType === "object") {
            deepExtend(dest, value);
        } else {
            target[key] = value;
        }
    });
    return target;
}
