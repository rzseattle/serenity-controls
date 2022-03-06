import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";
import { Control } from "react-hook-form/dist/types/form";
import { IOption } from "../../../fields";
import { useController } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import styles from "./CheckboxGroup.module.sass";
import { CommonIcons } from "../../../lib/CommonIcons";
import { HotKeys } from "../../../HotKeys";
import { Key } from "ts-key-enum";

export interface ICheckboxgroupProps extends ICommonInputProps {
    name?: string;
    value?: (number | string | boolean)[];
    readonly?: boolean;
    control: Control<any, any>;
    options: IOption[];
}

const CheckboxGroup = (props: ICheckboxgroupProps) => {
    const control = useController({ name: props.name, control: props.control });

    const [searchString, setSearchString] = useState("");
    const [highlighted, setHighlighted] = useState(-1);
    const searchFieldRef = useRef<HTMLInputElement>();
    const listRef = useRef<HTMLDivElement>();

    const [filteredOptions, setFilteredOptions] = useState(props.options);

    useEffect(() => {
        setFilteredOptions([
            ...props.options.filter((el) => {
                return searchString === "" || (el.label + "").toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
            }),
        ]);
        setHighlighted(-1);
    }, [searchString]);

    useEffect(() => {
        if (highlighted !== -1) {
            const el = listRef.current.childNodes[highlighted] as HTMLDivElement;
            el.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [highlighted]);

    const elementClicked = (index: number) => {
        if (index !== -1) {
            const found = control.field.value.findIndex((el: string) => el === filteredOptions[index].value);
            if (found === -1) {
                control.field.onChange({ target: { value: [...control.field.value, filteredOptions[index].value] } });
            } else {
                const tmp = [...control.field.value];
                tmp.splice(found, 1);
                control.field.onChange({ target: { value: tmp } });
            }
        }
    };

    return (
        <CommonInput
            label={props.label}
            fieldState={control.fieldState}
            readonly={props.readonly}
            readOnlyPresenter={props.readOnlyPresenter}
            valueForPresenter={() => ({
                real: control.field.value,
                presented: props.options.filter((el) => el.value === control.field.value)[0]?.label,
            })}
        >
            <>
                <HotKeys
                    actions={[
                        { key: Key.ArrowUp, handler: () => setHighlighted(Math.max(-1, highlighted - 1)) },
                        {
                            key: Key.ArrowDown,
                            handler: () => setHighlighted(Math.min(props.options.length - 1, highlighted + 1)),
                        },
                        {
                            key: Key.Enter,
                            handler: () => {
                                if (highlighted > -1) elementClicked(highlighted);
                            },
                        },
                    ]}
                    captureInput={true}
                    stopPropagation={true}
                >
                    {props.options.length > 10 && (
                        <input
                            type={"text"}
                            autoFocus={true}
                            placeholder={"Search"}
                            ref={searchFieldRef}
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                    )}
                    <div className={styles.list} ref={listRef}>
                        {filteredOptions.map((option, index) => {
                            return (
                                <div
                                    onMouseOver={() => {
                                        setHighlighted(index);
                                    }}
                                    onMouseOut={() => {
                                        setHighlighted(-1);
                                    }}
                                    className={
                                        (control.field.value.findIndex((el: string) => el === option.value) !== -1
                                            ? styles.selected
                                            : "") +
                                        " " +
                                        (highlighted === index ? styles.highlighted : "")
                                    }
                                    key={option.value as string}
                                    onClick={() => {
                                        elementClicked(index);
                                    }}
                                >
                                    <div className={styles.checkbox}>
                                        <CommonIcons.check />
                                    </div>
                                    <div className={styles.label}>{option.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </HotKeys>
            </>
        </CommonInput>
    );
};
export default CheckboxGroup;
