import * as React from "react";

import "./EditableCell.sass";
import styles from "./EditableTextCell.module.sass";
import { Icon } from "../../../Icon";
import { useCallback, useRef, useState } from "react";
import { IEditableCellProps } from "./IEditableCellProps";
import { ValidationError } from "../../../BForm/ValidationError";

export default ({ inputValue, onSubmit, onCancel }: IEditableCellProps): JSX.Element => {
    const [value, setValue] = useState(inputValue);
    const [error, setError] = useState<ValidationError>(null);
    const inputRef = useRef<HTMLInputElement>();

    const internalSubmit = useCallback(() => {
        const result = onSubmit(value);

        if (result !== true) {
            inputRef.current.focus();
        }
        if (result && result.fieldErrors !== undefined) {
            console.log("to je to ");
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
                        <Icon name="Accept" />
                    </a>
                </div>
                <div>
                    <a onClick={onCancel} className={styles.cancel}>
                        <Icon name="ChromeClose" />
                    </a>
                </div>
            </div>
            {error !== null && (
                <div className={styles.errors}>
                    <ul>
                        {error.formErrors.map((el) => (
                            <li key={el}>{el}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
