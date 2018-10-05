export const deepCopy = (obj) => {
    return x(Array.isArray(obj) ? [] : {}, obj);
};

export const deepIsEqual = (a, b) => {
    if (a === b) { return true; }

    let arrA = Array.isArray(a)
        , arrB = Array.isArray(b)
        , i;

    if (arrA && arrB) {
        if (a.length != b.length) { return false; }
        for (i = 0; i < a.length; i++) {
            if (!deepIsEqual(a[i], b[i])) { return false;
        } }
        return true;
    }

    if (arrA != arrB) { return false; }

    if (a && b && typeof a === "object" && typeof b === "object") {
        let keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length) { return false; }

        let dateA = a instanceof Date
            , dateB = b instanceof Date;
        if (dateA && dateB) { return a.getTime() == b.getTime(); }
        if (dateA != dateB) { return false; }

        let regexpA = a instanceof RegExp
            , regexpB = b instanceof RegExp;
        if (regexpA && regexpB) { return a.toString() == b.toString(); }
        if (regexpA != regexpB) { return false; }

        for (i = 0; i < keys.length; i++) {
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) { return false;
        } }

        for (i = 0; i < keys.length; i++) {
            if (!deepIsEqual(a[keys[i]], b[keys[i]])) { return false;
        } }

        return true;
    }

    return false;
};

function x(clone, obj) {

    for (let i in obj) {
        clone[i] = (typeof obj[i] == "object" && obj[i] !== null) ? x(obj[i].constructor(), obj[i]) : obj[i];
    }
    return clone;
}

export function deepExtend(target, source) {
    Object.keys(source).forEach(function(key) {
        let value = source[key];
        let dest = target[key];
        let sourceType = typeof value;
        let destType = typeof target[key];

        if (Array.isArray(value) && Array.isArray(dest)) {
            target[key] = dest.concat(value);
        }
        else if (sourceType === destType && sourceType === "object") {
            deepExtend(dest, value);
             }
        else {
            target[key] = value;
             }
    });
    return target;
}
