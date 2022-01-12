import { ILocale } from "../interfaces/ILocale";

const locale: ILocale = {
    apply: "Apply",
    cancel: "Cancel",
    filter: {
        like: "contains",
        equals: "equals",
        differentThan: "different than",
        notLike: "not contains",
        startsWith: "starts with",
        endsWith: "ends with",
        addCondition: "Add condition",

        dateIsSet: "Date is set",
        dateIsNotSet: "Date is not set",


        smaller: "smaller than",
        smallerEqual: "smaller equals",
        greater: "greater than",
        greaterEqual: "greater equal",
        between: "between",
    },
};

export default locale;
