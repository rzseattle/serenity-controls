declare namespace HotKeysModuleSassNamespace {
    export interface IHotKeysModuleSass {
        div: string;
    }
}

declare const HotKeysModuleSassModule: HotKeysModuleSassNamespace.IHotKeysModuleSass & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: HotKeysModuleSassNamespace.IHotKeysModuleSass;
};

export = HotKeysModuleSassModule;
