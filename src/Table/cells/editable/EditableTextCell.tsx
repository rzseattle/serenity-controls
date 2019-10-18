import * as React from "react";

import "./EditableCell.sass";
export default ({ inputValue }: { inputValue: string }) => {
    return (
        <div className="w-table-editable-cell">
            <input type="text" value={inputValue} autoFocus={true} onClick={(e) => e.stopPropagation()} />
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
