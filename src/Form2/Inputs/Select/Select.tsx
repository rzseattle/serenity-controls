import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";
import { Control, useController } from "react-hook-form";
import { IOption } from "../../../fields";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "../../../Modal";
import { RelativePositionPresets } from "../../../Positioner";
import styles from "./Select.module.sass";
import { CommonIcons } from "../../../lib/CommonIcons";
import { HotKeys } from "../../../HotKeys";
import { Key } from "ts-key-enum";

export interface ISelectProps extends ICommonInputProps {
    name?: string;
    value?: string;
    readonly?: boolean;
    control: Control<any, any>;
    options: IOption[];
    autofocus?: boolean;
}

const Select = (props: ISelectProps) => {
    const control = useController({ name: props.name, control: props.control });
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [highlighted, setHighlighted] = useState(-1);
    const selectRef = useRef<HTMLDivElement>();
    const searchFieldRef = useRef<HTMLInputElement>();
    const listRef = useRef<HTMLDivElement>();

    const [filteredOptions, setFilteredOptions] = useState(props.options);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (props.autofocus === true) {
                setDropdownVisible(true);
            }
        }, 40);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

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

    const setValue = (index: number) => {
        if (index !== -1) {
            control.field.onChange({ target: { value: filteredOptions[index].value } });
            setDropdownVisible(false);
            setHighlighted(-1);
            selectRef.current.focus();
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
                        {
                            key: Key.Enter,
                            handler: () => {
                                setDropdownVisible(true);
                            },
                        },
                    ]}
                    captureInput={true}
                    stopPropagation={true}
                >
                    <div
                        data-testid={"select"}
                        className={styles.select}
                        ref={selectRef}
                        onClick={() => setDropdownVisible(true)}
                        tabIndex={0}
                    >
                        <span>{props.options.filter((el) => el.value === control.field.value)[0]?.label}</span>
                        <CommonIcons.chevronDown />
                    </div>
                </HotKeys>
                {isDropdownVisible && (
                    <Modal
                        show={true}
                        relativeTo={() => selectRef.current}
                        relativeSettings={{ ...RelativePositionPresets.bottomLeft, widthCalc: "same" }}
                        shadow={false}
                        onHide={() => setDropdownVisible(false)}
                        className={styles.dropdown}
                    >
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
                                        if (highlighted > -1) setValue(highlighted);
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
                                                (option.value === control.field.value ? styles.selected : "") +
                                                " " +
                                                (highlighted === index ? styles.highlighted : "")
                                            }
                                            key={option.value as string}
                                            onClick={() => {
                                                setValue(index);
                                            }}
                                        >
                                            {option.label}
                                        </div>
                                    );
                                })}
                            </div>
                        </HotKeys>
                    </Modal>
                )}
            </>
        </CommonInput>
    );
};
export { Select };
