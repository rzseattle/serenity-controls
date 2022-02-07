import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";
import { Control } from "react-hook-form/dist/types/form";
import { IOption } from "../../../fields";
import { useController } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../../../Modal";
import { RelativePositionPresets } from "../../../Positioner";
import styles from "./CheckboxGroup.module.sass";
import { CommonIcons } from "../../../lib/CommonIcons";
import { HotKeys } from "../../../HotKeys";
import { Key } from "ts-key-enum";
import React from "react";
export interface ICheckboxgroupProps extends ICommonInputProps {
    name?: string;
    value?: string;
    readonly?: boolean;
    control: Control<any, any>;
    options: IOption[];
}

const CheckboxGroup = (props: ICheckboxgroupProps) => {
    const control = useController({ name: props.name, control: props.control });
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [highlighted, setHighlighted] = useState(-1);
    const searchFieldRef = useRef<HTMLInputElement>();
    const listRef = useRef<HTMLDivElement>();

    const [filteredOptions, setFilteredOptions] = useState(props.options);

    useEffect(() => {
        setSearchString("");
        if (searchFieldRef.current) {
            setTimeout(() => {
                searchFieldRef.current.focus();
            }, 40);
        }
    }, [isDropdownVisible]);

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
            control.field.onChange({ target: { value: filteredOptions[index].value } });
            setDropdownVisible(false);
            setHighlighted(-1);
        }
    };

    return (
        <CommonInput label={props.label} fieldState={control.fieldState}>
            {props.readonly ? (
                <div className="w-read-only">
                    {props.options.filter((el) => el.value === control.field.value)[0]?.label}
                </div>
            ) : (
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
                            {
                                key: Key.Escape,
                                handler: () => {
                                    setDropdownVisible(false);
                                },
                            },
                            {
                                key: Key.Tab,
                                handler: () => {
                                    setDropdownVisible(false);
                                },
                            },
                        ]}
                        captureInput={true}
                        stopPropagation={true}
                    >
                        <input
                            type={"text"}
                            autoFocus={true}
                            placeholder={"Search"}
                            ref={searchFieldRef}
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                        <div className={styles.list} ref={listRef}>
                            {filteredOptions.map((option, index) => {
                                return (
                                    <div
                                        onMouseEnter={() => {
                                            setHighlighted(index);
                                        }}
                                        onMouseOut={() => {
                                            setHighlighted(-1);
                                        }}
                                        className={
                                            ((control.field.value.findIndex(option.value)) !== -1
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

                                        {option.label}
                                    </div>
                                );
                            })}
                        </div>
                    </HotKeys>
                </>
            )}
        </CommonInput>
    );
};
export default CheckboxGroup;
