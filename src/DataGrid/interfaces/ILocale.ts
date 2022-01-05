export interface ILocale {
    apply: string;
    cancel: string;
    filter: Filter;
}

export interface Filter {
    like: string;
    equals: string;
    differentThan: string;
    notLike: string;
    startsWith: string;
    endsWith: string;
    addCondition: string
}
