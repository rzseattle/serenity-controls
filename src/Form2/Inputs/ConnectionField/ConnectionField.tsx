import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";

import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";
import { IConnectionChangeEvent } from "../../../ConnectionsField";
import styles from "./ConnectionField.module.sass";
import { RelativePositionPresets } from "../../../Positioner";
import { Modal } from "../../../Modal";
import { HotKeys } from "../../../HotKeys";
import { Key } from "ts-key-enum";
import { Shimmer } from "../../../Shimmer";
import { TiDelete } from "react-icons/ti";
import { BsPlusCircleDotted } from "react-icons/bs";

export interface IConnectionElement {
    value: string | number;
    label: string;
    icon?: () => JSX.Element;
    className?: string;
    data?: any;
}

export interface IConnectionFieldDSInput {
    searchString: string;
    selected: string[] | number[] | Array<string | number>;
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
    value?: string[] | number[] | string;

    /**
     * Value is kept as string or array
     */
    valueFormat?: "string" | "array";

    /**
     * String value divider
     */
    valueFormatStringDivider?: string;

    /**
     * Maximum items selected from list
     */
    maxItems?: number;
    /**
     * Items loaded on init of the  field  ( selected items )
     */
    items?: IConnectionElement[];

    /**
     * Using search provider to fill field by items attached to values
     * input.requestType = "getItems"
     */
    fillItems?: boolean;

    /**
     * Template applied to selection list
     */
    itemRenderer?: (element: IConnectionElement, inPopup: boolean) => any;

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

const defaultProps: Partial<IConnectionFieldProps> = {
    maxItems: 5,
    valueFormat: "array",
    valueFormatStringDivider: ",",
};

const ConnectionField = (props: IConnectionFieldProps) => {
    const options = { ...defaultProps, ...props };
    const control = useController({ name: props.name, control: props.control });

    /**
     * Currently selected index from search list
     */
    const [selected, setSelected] = useState<number>(0);
    /**
     * Search string
     */
    const [search, setSearch] = useState<string>("");
    /**
     * Elements found by search in ds
     */
    const [found, setFound] = useState<IConnectionElement[]>([]);
    /**
     * Loading data from values indicator
     */
    const [loadingValues, setLoadingValues] = useState<boolean>(false);

    /**
     * Data witch is selected (from startup value or from list selection )
     */
    const [selectedData, setSelectedData] = useState<IConnectionElement[]>([]);

    /**
     * Determines do we see search input
     */
    const [editMode, setEditMode] = useState<boolean>(false);

    const refInput = useRef<HTMLInputElement>();

    const getParsedValue = (): string[] | number[] => {
        if (options.valueFormat === "string" && control.field.value) {
            return (control.field.value as string).split(options.valueFormatStringDivider);
        } else if (options.valueFormat === "array" && Array.isArray(control.field.value)) {
            return control.field.value;
        }
        return [];
    };

    const doExternalIsEqual = (data: IConnectionElement[]) => {
        return (
            getParsedValue().sort().toString() ===
            data
                .map((el) => el.value)
                .sort()
                .toString()
        );
    };

    //if value and we don't have item
    useEffect(() => {
        const val = getParsedValue();

        if (control.field.value && !doExternalIsEqual(selectedData)) {
            setLoadingValues(true);
            (async () => {
                const result = await props.ds({ searchString: search, requestType: "getItems", selected: val });

                setSelectedData(
                    val.map((el) => {
                        const found = result.results.filter((loaded) => el == loaded.value);
                        if (found.length > 0) {
                            return found[0];
                        }
                        return { value: el, label: `--- value '${el}' could not be loaded -- ` };
                    }),
                );

                setLoadingValues(false);
            })();
        }
    }, [control.field.value]);

    useEffect(() => {
        const value =
            options.valueFormat === "string"
                ? selectedData.map((el) => el.value).join(options.valueFormatStringDivider)
                : selectedData.map((el) => el.value);

        if (!doExternalIsEqual(selectedData)) {
            control.field.onChange({
                target: {
                    value,
                },
            });
        }
    }, [selectedData]);

    // search effect
    useEffect(() => {
        (async () => {
            if (search.length > 0) {
                const result = await props.ds({
                    searchString: search,
                    requestType: "search",
                    selected: selectedData.map((el) => el.value),
                });
                setSelected(0);
                setFound(result.results);
            } else {
                setFound([]);
            }
        })();
    }, [search]);

    // scroll options effect
    useLayoutEffect(() => {
        const element = document.getElementsByClassName(styles.foundItemSelected)[0];
        if (element) {
            // @ts-ignore this is new browser function
            element.scrollIntoViewIfNeeded({
                behavior: "smooth",
            });
        }
    }, [selected]);

    // focusing input after we enter into search mode
    useLayoutEffect(() => {
        if (editMode) {
            refInput.current.focus();
        }
    }, [editMode]);

    const addItem = () => {
        setSelectedData((data) => {
            if (options.maxItems === 1) {
                return [found[selected]];
            }
            return [...data, found[selected]];
        });

        setSearch("");
        setFound([]);
        setEditMode(false);
    };

    const removeItem = (item: IConnectionElement) => {
        setSelectedData((data) => {
            return [...data].filter((el) => el.value !== item.value);
        });
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
                <div className={styles.resultPresenter}>
                    {loadingValues && <Shimmer />}
                    {selectedData.length > 0 && (
                        <div className={styles.list}>
                            {selectedData.map((el) => (
                                <div key={el.value} className={styles.selectedElement}>
                                    <div>{options.itemRenderer ? options.itemRenderer(el, false) : el.label}</div>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeItem(el);
                                        }}
                                    >
                                        <TiDelete />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {!editMode && selectedData.length < options.maxItems && (
                        <div
                            onClick={() => {
                                setEditMode(true);
                            }}
                            className={styles.add}
                        >
                            <BsPlusCircleDotted />
                        </div>
                    )}

                    {/*{selectedData.length == 0 && !loadingValues && !editMode && (*/}
                    {/*    <div className={styles.selectedElement}>*/}
                    {/*        <div>---</div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
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
                                        addItem();
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
                                onBlur={() => {
                                    //need timeout couse it works before we are able to click on list
                                    setTimeout(() => {
                                        setEditMode(false);
                                    }, 100);
                                }}
                            />
                        </HotKeys>
                    </>
                )}
                <Modal
                    show={found.length > 0}
                    relativeTo={() => refInput.current}
                    relativeSettings={{ ...RelativePositionPresets.bottomLeft, widthCalc: "same" }}
                    shadow={false}
                    // hideOnBlur={true}
                    onHide={() => setFound([])}
                    className={styles.dropdown}
                >
                    <div className={styles.foundItemContainer} tabIndex={-1}>
                        {found.map((el, index) => (
                            <div
                                key={el.value}
                                className={styles.foundItem + " " + (selected == index ? styles.foundItemSelected : "")}
                                onClick={() => {
                                    addItem();
                                }}
                                onMouseEnter={() => {
                                    setSelected(index);
                                }}
                            >
                                {options.itemRenderer ? options.itemRenderer(el, true) : el.label}
                            </div>
                        ))}
                    </div>
                </Modal>
            </div>
        </CommonInput>
    );
};

export { ConnectionField };
