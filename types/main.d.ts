import * as React from "react";

declare global {
    declare namespace Frontend {
        declare namespace Debug {
            export interface RouteInfo {
                _controller: string;
                _method: string;
                _package: string;
                _routePath: string;
                _baseRoutePath: string;
                _debug: {
                    file: string;
                    line: string;
                    template: string;
                    templateExists: boolean;
                    componentExists: boolean;
                };
            }

            export interface DebugDataEntry {
                route: string;
                props: any[];
                urls: any[];
                instances: number;
                routeInfo: RouteInfo;
            }

            export type DebugDataListener = (data: DebugDataEntry[]) => any;
        }
    }
}

import * as React from "react";

declare module "react" {
    function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void];
    function useEffect(create: () => void | (() => void), inputs?: ReadonlyArray<unknown>): void;
    function useContext<T>(foo: React.Context<T>): T;
    function useReducer<S, A>(reducer: (state: S, action: A) => S, initialState: S): [S, (action: A) => void];
    function useCallback<F extends (...args: never[]) => unknown>(callback: F, inputs?: ReadonlyArray<unknown>): F;
    function useMemo<T>(create: () => T, inputs?: ReadonlyArray<unknown>): T;
    function useRef<T extends unknown>(initialValue?: T): React.RefObject<T>;
    function useImperativeMethods<T>(ref: React.Ref<T>, createInstance: () => T, inputs?: ReadonlyArray<unknown>): void;
    const useMutationEffect: typeof useEffect;
    const useLayoutEffect: typeof useEffect;
}
