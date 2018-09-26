import { Comm } from "../lib/Comm";

const isPromise = (obj: any) => {
    return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
};

export class Datasource<T, I = {}> {
    private source: string | Promise<T> | ((input: any) => T);
    private input: I;
    private eventsReady: Array<(result: T) => any> = [];
    private filters: { map: any[]; filter: any[] } = { map: [], filter: [] };

    constructor(source: string | Promise<T> | ((input: I) => T), input: I = null) {
        this.source = source;
        this.input = input;
    }

    public static from<T, I = {}>(source: string | Promise<T> | ((input: I) => T), input: I = null) {
        return new Datasource<T>(source, input);
    }

    public setInput(input: I) {
        this.input = input;
        return this;
    }

    public observe(fn: (result: T) => any): Datasource<T> {
        this.eventsReady.push(fn);
        return this;
    }

    public runReady(result: any) {
        let processedResult: T;

        for (const map of this.filters.map) {
            processedResult = result.map(map);
        }
        for (const filter of this.filters.filter) {
            processedResult = result.map(filter);
        }
        for (const event of this.eventsReady) {
            event(processedResult ? processedResult : result);
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

    public filter(fn: (result: any) => any) {
        this.filters.filter.push(fn);
    }
}
