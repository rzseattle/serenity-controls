import {IFile} from "./FileLists";

export const printFile = ( file: IFile ) => {

    const pwin = window.open(file.path, "_blank");

    pwin.onload = function() {
        pwin.focus();
        pwin.print();

        setTimeout(pwin.close, 0);
    };

};
