import { Comm } from "../lib/Comm";

const isPromise = (obj: any) => {
    return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
};

export class Datasource<T> {
    private source: string | Promise<T> | ((input: any) => T);
    private input: any;
    private eventsReady: Array<(result: any) => any> = [];
    private filters: { map: any[] } = { map: [] };

    constructor(source: string | Promise<T> | ((input: any) => T), input = {}) {
        this.source = source;
        this.input = input;
    }

    public static from<T>(source: string | Promise<T> | ((input: any) => T), input = {}) {
        return new Datasource<T>(source, input);
    }

    public observe(fn: (result: T) => any): Datasource<T> {
        this.eventsReady.push(fn);
        return this;
    }

    public runReady(result: any) {
        for (const map of this.filters.map) {
            result = result.map(map);
        }
        for (const event of this.eventsReady) {
            event(result);
        }
    }

    public processResult(result: T) {
        if (typeof result == "function" || isPromise(result) || typeof result == "string") {
            const obj = new Datasource<T>(result as any, this.input);

            obj.observe((subResult: T) => {
                this.runReady(subResult);
            });
            obj.resolve();
        } else if (result instanceof Datasource) {
            result.observe((subResult: T) => {
                this.runReady(subResult);
            });
            result.resolve();
        } else {
            this.runReady(result);
        }
    }

    public resolve = () => {
        if (typeof this.source == "function") {
            this.processResult(this.source(this.input));
        }
        // check is promise
        if (isPromise(this.source)) {
            (this.source as Promise<any>).then((result: T) => {
                this.processResult(result);
            });
        }

        if (typeof this.source == "string") {
            Comm._get(this.source, this.input).then((result: T) => {
                this.processResult(result);
            });
        }
    };

    public map(fn: (result: any) => any) {
        this.filters.map.push(fn);
    }
}
