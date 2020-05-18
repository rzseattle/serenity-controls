declare namespace DebugCommLogModuleSassModule {
    export interface IDebugCommLogModuleSass {
        container: string;
        hidden: string;
        title: string;
        "w-debug-comm-log-inspect": string;
    }
}

declare const DebugCommLogModuleSassModule: DebugCommLogModuleSassModule.IDebugCommLogModuleSass & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: DebugCommLogModuleSassModule.IDebugCommLogModuleSass;
};

export default DebugCommLogModuleSassModule;
