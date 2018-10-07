import { IOption } from "./Interfaces";

export const checkIncludes = (options: any, value: string | number) => {
    const element = options.filter((el: IOption | string) => {
        // @ts-ignore
        if (el.value !== undefined) {
            // @ts-ignore
            return el.value == value;
        } else {
            return el == value;
        }
    });
    return element.length > 0;
};
