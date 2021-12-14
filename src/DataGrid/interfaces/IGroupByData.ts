export interface IGroupByData<Row> {
    field?: Extract<keyof Row, string | number>;
    equalizer?: (prevRow: Row, nextRow: Row) => boolean;
    labelProvider?: (nextRow: Row, prevRow: Row) => string | JSX.Element;
}
