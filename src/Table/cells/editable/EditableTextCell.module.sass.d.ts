declare namespace EditableTextCellModuleSassModule {
    export interface IEditableTextCellModuleSass {
        accept: string;
        cancel: string;
        container: string;
        errors: string;
    }
}

declare const EditableTextCellModuleSassModule: EditableTextCellModuleSassModule.IEditableTextCellModuleSass & {
    /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
    locals: EditableTextCellModuleSassModule.IEditableTextCellModuleSass;
};

export default EditableTextCellModuleSassModule;
