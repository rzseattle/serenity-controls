import * as React from "react";

import "./EditableCell.sass";
import styles from "./EditableTextCell.module.sass";
import { Icon } from "../../../Icon";
import { useState } from "react";

export default ({
    inputValue,
    onSubmit,
    onCancel,
}: {
    inputValue: string;
    onSubmit: (value: any) => any;
    onCancel: () => any;
}) => {
    const [value, setValue] = useState(inputValue);

    return (
        <div className={styles.container}>
            <div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    className="form-control"
                    autoFocus={true}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
            <div>
                <a  onClick={onSubmit} className={styles.accept}>
                    <Icon name="Accept" />
                </a>
            </div>
            <div>
                <a onClick={onCancel} className={styles.cancel}>
                    <Icon name="ChromeClose" />
                </a>
            </div>
        </div>
    );
};

/*
*

<div className={"global-input-column"}>
                                <input
                                    type="text"
                                    onChange={(e) => (changedValue = e.target.value)}
                                    defaultValue={value}
                                    autoFocus={true}
                                    onBlur={() => {
                                        if (value !== changedValue) {
                                            fn(column, row, changedValue);
                                        }

                                        delete columnsInEditState[column.field];
                                        rowContainer.setData("columnsInEdit", columnsInEditState);
                                        rowContainer.forceUpdate();
                                    }}
                                />
                            </div>

* */
