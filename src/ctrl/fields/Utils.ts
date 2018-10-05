export const checkIncludes = (options, value) => {
    const element = options.filter((element) => {
        if (element.value !== undefined) {
            return element.value == value;
        } else {
            return element == value;
        }
    });
    return element.length > 0;
};
