import React, { useRef, useState } from "react";
import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";

import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";
import { Calendar } from "react-date-range";
// @ts-ignore
import { pl } from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format, parse } from "date-fns";
import { Modal } from "../../../Modal";
import { RelativePositionPresets } from "../../../Positioner";
import { Key } from "ts-key-enum";

export interface IDateProps extends ICommonInputProps {
    name?: string;
    value?: string;
    readonly?: boolean;
    control: Control<any, any>;
}

const dateFormat = "yyyy-MM-dd";

const Date = (props: IDateProps) => {
    const control = useController({ name: props.name, control: props.control });
    const inputRef = useRef<HTMLInputElement>();
    const [isPickerVisible, setPickerVisible] = useState<boolean>(false);
    let date;
    if (isPickerVisible) {
        date = parse(control.field.value, dateFormat, new window.Date());
        if (date + "" === "Invalid Date") {
            date = new window.Date();
        }
    }

    return (
        <CommonInput label={props.label} fieldState={control.fieldState}>
            {props.readonly ? (
                <div className="w-read-only">{control.field.value}</div>
            ) : (
                <div ref={inputRef}>
                    <input
                        type="text"
                        {...props.control.register(props.name)}
                        onChange={(e) => {
                            control.field.onChange({ target: { value: e.target.value } });
                        }}
                        value={control.field.value}
                        onBlur={() => {
                            control.field.onBlur();
                        }}
                        onClick={() => {
                            setPickerVisible(true);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === Key.Enter) {
                                setPickerVisible((v) => !v);
                            }
                        }}
                        style={{ backgroundColor: isPickerVisible ? "yellow" : "transparent" }}
                    />
                    {isPickerVisible && (
                        <Modal
                            show={true}
                            relativeSettings={RelativePositionPresets.bottomRight}
                            relativeTo={() => inputRef.current}
                            onHide={() => setPickerVisible(false)}
                            shadow={false}
                        >
                            <div>
                                <Calendar
                                    onChange={(item) => {
                                        setPickerVisible(false);
                                        control.field.onChange({ target: { value: format(item, dateFormat) } });
                                    }}
                                    date={date}
                                    locale={pl}
                                />
                            </div>
                        </Modal>
                    )}
                </div>
            )}
        </CommonInput>
    );
};

export default Date;