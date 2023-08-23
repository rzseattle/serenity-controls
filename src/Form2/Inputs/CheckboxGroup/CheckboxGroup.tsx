import CommonInput, { ICommonInputProps, IFieldPresentationValue } from "../CommonInput/CommonInput";
import { Control } from "react-hook-form";
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
    disableSearch?: boolean;
    columns?: number;
}

const CheckboxGroup = (props: ICheckboxgroupProps) => {
    const control = useController({ name: props.name, control: props.control });

    const [searchString, setSearchString] = useState("");
    const [highlighted, setHighlighted] = useState(-1);
    const searchFieldRef = useRef<HTMLInputElement>();
    const listRef = useRef<HTMLDivElement>();

    const [filteredOptions, setFilteredOptions] = useState(props.options);

    const columns = props.columns != undefined ? props.columns : 1;

    const columnWidth: React.CSSProperties = { width: 100 / columns + "%" };

    const columDivider = Math.ceil(props.options.length / columns);

    useEffect(() => {
        setFilteredOptions([
            ...props.options.filter((el) => {
                return searchString === "" || (el.label + "").toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
            }),
        ]);
        setHighlighted(-1);
    }, [searchString]);

    // useEffect(() => {
    //     if (highlighted !== -1) {
    //         const el = listRef.current.childNodes[highlighted] as HTMLDivElement;
    //         el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    //     }
    // }, [highlighted]);

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
            help={props.help}
            readOnlyPresenter={
                props.readOnlyPresenter !== undefined
                    ? props.readOnlyPresenter
                    : (value: IFieldPresentationValue) => {
                          return (
                              <ul>
                                  {(value.presented as IOption[]).map((el) => (
                                      <li key={el.value + ""}>{el.label}</li>
                                  ))}
                              </ul>
                          );
                      }
            }
            valueForPresenter={() => ({
                real: control.field.value,
                presented: props.options.filter((el) => control.field.value.includes(el.value)),
            })}
        >
            <>
                xxxasdasd
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
                    {props.disableSearch !== true && props.options.length > 10 && (
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
                        <div>
                            {Array.from({ length: columns }, (v, k) => k).map((el) => {
                                return (
                                    <div key={el} style={columnWidth}>
                                        {filteredOptions
                                            .slice(el * columDivider, columDivider * (el + 1))
                                            .map((option: IOption, index) => {
                                                return (
                                                    <div
                                                        onMouseOver={() => {
                                                            setHighlighted(index + el * columDivider);
                                                        }}
                                                        onMouseOut={() => {
                                                            setHighlighted(-1);
                                                        }}
                                                        className={
                                                            (control.field.value.findIndex(
                                                                (el: string) => el === option.value,
                                                            ) !== -1
                                                                ? styles.selected
                                                                : "") +
                                                            " " +
                                                            (highlighted === index + el * columDivider
                                                                ? styles.highlighted
                                                                : "")
                                                        }
                                                        key={option.value as string}
                                                        onClick={() => {
                                                            elementClicked(index + el * columDivider);
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
                                );
                            })}
                        </div>
                    </div>
                </HotKeys>
            </>
        </CommonInput>
    );
};
export { CheckboxGroup };
