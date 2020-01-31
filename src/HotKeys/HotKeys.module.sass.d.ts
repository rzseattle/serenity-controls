declare namespace HotKeysModuleSassModule {
    export interface IHotKeysModuleSass {
        div: string;
    }
}

declare const HotKeysModuleSassModule: HotKeysModuleSassModule.IHotKeysModuleSass & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: HotKeysModuleSassModule.IHotKeysModuleSass;
};

export default HotKeysModuleSassModule;
