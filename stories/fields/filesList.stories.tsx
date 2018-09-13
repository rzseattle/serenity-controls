import React, {Component, StatelessComponent} from "react";
import {storiesOf} from "@storybook/react";
import {action, decorateAction} from "@storybook/addon-actions";

import {BFileList} from "../../src/layout/BootstrapForm";
import {FileList} from "../../src/ctrl/FileLists";

/**
 *
 * @param xxx
 * @constructor
 * @return FileList
 */
const XXX: StatelessComponent<{test: any}> = (xxx ): StatelessComponent<{test: any}>  => {
    const Comp = xxx;
    return (props) => {

        return <pre>{JSON.stringify(props)} <Comp /></pre>;
    };
}

/** */
const CFile: FileList = XXX(FileList);

storiesOf("Files fieds", module)
    .add(
        "File list",
        () => (
            <>
                <BFileList   />
                <CFile test={"1"}/>
            </>
        ));
