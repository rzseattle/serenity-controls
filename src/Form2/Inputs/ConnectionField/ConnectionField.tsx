import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";

import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";
import { IConnectionChangeEvent, IConnectionFieldInput } from "../../../ConnectionsField";
import styles from "./ConnectionField.module.sass";
import { RelativePositionPresets } from "../../../Positioner";
import { Modal } from "../../../Modal";
import { HotKeys } from "../../../HotKeys";
import { Key } from "ts-key-enum";
import { PrintJSON } from "../../../PrintJSON";
import { value } from "../../../DataGrid/parts/Addons/GridConditionsPresenter/GridConditionsPresenter.module.sass";

export interface IConnectionElement {
    value: string | number;
    label: string;
    icon?: () => JSX.Element;
    className?: string;
    data?: any;
}

export interface IConnectionFieldDSInput {
    searchString: string;
    selected: string[] | number[];
    requestType: "search" | "getItems";
}

export type IConnectionFieldDS = (
    input: IConnectionFieldDSInput,
) => Promise<{ more: boolean; results: IConnectionElement[] }>;

export interface IConnectionFieldProps extends ICommonInputProps {
    ds: IConnectionFieldDS;
    name?: string;
    readonly?: boolean;
    control: Control<any, any>;

    /**
     * Value of the field. Array if maxItems > 1, string | number if maxItems == 1
     */
    value: string[] | number[];
    /**
     * Maximum items selected from list
     */
    maxItems?: number;
    /**
     * Items loaded on init of the  field  ( selected items )
     */
    items?: IConnectionElement[];
    /**
     * Search result provider
     * input.requestType = "search"
     */
    searchResultProvider: (input: IConnectionFieldInput) => Promise<IConnectionElement[]>;

    /**
     * Using search provider to fill field by items attached to values
     * input.requestType = "getItems"
     */
    fillItems?: boolean;

    /**
     * Template applied to selection list
     */
    itemTemplate?: (element: IConnectionElement) => any;

    /**
     * Template applied to selection list
     */
    selectionTemplate?: (element: IConnectionElement) => any;
    /**
     * Placeholder
     */
    placeholder?: string;

    /**
     * Vertical elements presentation
     */
    verticalDisplay?: boolean;

    /**
     * onChange event
     */
    onChange?: (changeData: IConnectionChangeEvent) => any;

    /**
     *  Prints data information under field
     */
    debug?: boolean;

    /**
     * If true opening search box without any phrase entered
     */
    searchWithoutPhrase?: boolean;

    /**
     * If item is clicked
     */

    onItemClick?: (element: IConnectionElement) => any;
}

const ConnectionField = (props: IConnectionFieldProps) => {
    const control = useController({ name: props.name, control: props.control });

    const [selected, setSelected] = useState<number>(0);
    const [search, setSearch] = useState<string>("");
    const [found, setFound] = useState<IConnectionElement[]>([]);
    const refInput = useRef<HTMLInputElement>();

    const [selectedData, setSelectedData] = useState<IConnectionElement[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            if (search.length > 0) {
                const result = await props.ds({ searchString: search, requestType: "search", selected: [] });
                setSelected(0);
                setFound(result.results);
            } else {
                setFound([]);
            }
        })();
    }, [search]);

    useLayoutEffect(() => {
        const element = document.getElementsByClassName(styles.foundItemSelected)[0];
        if (element) {
            element.scrollIntoViewIfNeeded({
                behavior: "smooth",
            });
        }
    }, [selected]);
    useLayoutEffect(() => {
        if(editMode) {
            refInput.current.focus()
        }
    }, [editMode])

    const max = props.maxItems ?? 1;

    const changeValue = () => {
        control.field.onChange({ target: { value: max === 1 ? found[selected].value : [found[selected].value] } });
        setSelectedData([found[selected]]);
        setSearch("");
        setFound([]);
        setEditMode(false);
    };

    return (
        <CommonInput
            label={props.label}
            fieldState={control.fieldState}
            readonly={props.readonly}
            help={props.help}
            readOnlyPresenter={props.readOnlyPresenter}
            valueForPresenter={() => ({ real: control.field.value, presented: control.field.value })}
        >
            <div>

                <div
                    onClick={() => {
                        setEditMode(true);
                    }}
                >
                    <PrintJSON json={control.field.value} />

                    {selectedData.map((el) => el.label)}
                </div>
                {editMode && (
                    <>
                        <HotKeys
                            actions={[
                                {
                                    key: Key.ArrowDown,
                                    handler: () => {
                                        setSelected((r) => (r < found.length - 1 ? r + 1 : found.length - 1));
                                    },
                                },
                                {
                                    key: Key.ArrowUp,
                                    handler: () => {
                                        setSelected((r) => (r - 1 < 0 ? 0 : r - 1));
                                    },
                                },
                                {
                                    key: Key.Enter,
                                    handler: () => {
                                        changeValue();
                                    },
                                },
                            ]}
                            observeFromInput={[Key.ArrowDown, Key.ArrowUp, Key.Enter]}
                        >
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                ref={refInput}
                            />
                            <Modal
                                show={found.length > 0}
                                relativeTo={() => refInput.current}
                                relativeSettings={{ ...RelativePositionPresets.bottomLeft, widthCalc: "same" }}
                                shadow={false}
                                // hideOnBlur={true}
                                onHide={() => setFound([])}
                                className={styles.dropdown}
                            >
                                <div
                                    className={styles.foundItemContainer}
                                    onFocus={() => {
                                        console.log("focused");
                                    }}
                                    tabIndex={-1}
                                >
                                    {found.map((el, index) => (
                                        <div
                                            key={el.value}
                                            className={
                                                styles.foundItem +
                                                " " +
                                                (selected == index ? styles.foundItemSelected : "")
                                            }
                                            onClick={() => {
                                                changeValue();
                                            }}
                                            onMouseEnter={() => {
                                                setSelected(index);
                                            }}
                                        >
                                            {el.label} <br />
                                        </div>
                                    ))}
                                </div>
                            </Modal>
                        </HotKeys>
                    </>
                )}
            </div>

            {/*<input*/}
            {/*    type="text"*/}
            {/*    readOnly={props.readonly}*/}
            {/*    {...props.control.register(props.name)}*/}
            {/*    onChange={(e) => {*/}
            {/*        control.field.onChange({ target: { value: e.target.value } });*/}
            {/*    }}*/}
            {/*    value={control.field.value}*/}
            {/*    onBlur={() => {*/}
            {/*        control.field.onBlur();*/}
            {/*    }}*/}
            {/*/>*/}
        </CommonInput>
    );
};

export { ConnectionField };
