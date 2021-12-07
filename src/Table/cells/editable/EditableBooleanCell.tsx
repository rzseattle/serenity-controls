import * as React from "react";
import { useCallback, useRef, useState } from "react";

import styles from "./EditableTextCell.module.sass";
import { IEditableCellProps } from "./IEditableCellProps";
import { CommonIcons } from "../../../lib/CommonIcons";

const EditableBooleanCell = ({ inputValue, onSubmit, onCancel }: IEditableCellProps): JSX.Element => {
    const [value, setValue] = useState(inputValue);
    const [error, setError] = useState<string[]>(null);
    const inputRef = useRef<HTMLInputElement>();

    const internalSubmit = useCallback(() => {
        const result = onSubmit(value);

        if (result !== true) {
            inputRef.current.focus();
        }
        if (Array.isArray(result)) {
            setError(result);
        }
    }, [value, error]);

    return (
        <div>
            <div className={styles.container}>
                <div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        className="form-control"
                        autoFocus={true}
                        onFocus={(event) => event.target.select()}
                        onClick={(e) => e.stopPropagation()}
                        onKeyUp={(e) => {
                            if (e.keyCode == 13) {
                                internalSubmit();
                            } else if (e.keyCode == 27) {
                                onCancel();
                            }
                        }}
                    />
                </div>
                <div>
                    <a onClick={internalSubmit} className={styles.accept}>
                        <CommonIcons.check />
                    </a>
                </div>
                <div>
                    <a onClick={onCancel} className={styles.cancel}>
                        <CommonIcons.close />
                    </a>
                </div>
            </div>
            {error !== null && (
                <div className={styles.errors}>
                    <ul>
                        {error.map((el) => (
                            <li key={el}>{el}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EditableBooleanCell;
