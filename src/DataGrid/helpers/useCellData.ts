import { useState } from "react";
import { ICellCoordinates } from "../interfaces/ICellCoordinates";

interface ICellLookup extends ICellCoordinates {
    key?: string | number;
}

export const useCellData = <T>(
    initial: { key: ICellLookup; data: T }[] = [],
): [
    (lookup: ICellLookup) => T,
    (lookup: ICellLookup, data: T | ((data: T) => T)) => void,
    () => { key: ICellLookup; data: T }[],
] => {
    const [registry, setRegistry] = useState<{ key: ICellLookup; data: T }[]>(initial);

    return [
        (lookup: ICellLookup): T => {
            const found = registry.filter((curr) => {
                return curr.key.row === lookup.row && curr.key.column === lookup.column && curr.key.key === lookup.key;
            });
            return found[0]?.data;
        },

        (lookup: ICellLookup, data: T | ((data: T) => T)) => {
            const index = registry.findIndex((curr) => {
                return curr.key.row === lookup.row && curr.key.column === lookup.column && curr.key.key === lookup.key;
            });

            let oldData;
            if (index !== -1) {
                oldData = registry[index].data;
            } else {
                oldData = null;
            }
            const newData: T = data instanceof Function ? data(oldData) : data;

            let dataToSet: T;
            //if data is object
            if (newData instanceof Object) {
                dataToSet = { ...oldData, ...newData };
                //if data is array
            } else if (newData instanceof Array) {
                if (oldData !== null && oldData instanceof Array) {
                    // @ts-ignore
                    dataToSet = [...oldData, ...newData];
                } else {
                    // @ts-ignore
                    dataToSet = [...newData];
                }
                //if data is smth else
            } else {
                dataToSet = newData;
            }

            if (index > -1) {
                registry.splice(index, 1);
                setRegistry([...registry.slice(0, index), { key: lookup, data: dataToSet }, ...registry.slice(index)]);
            } else {
                setRegistry([...registry, { key: lookup, data: dataToSet }]);
            }
        },
        () => {
            return registry;
        },
    ];
};
