import { Modal } from "../Modal";
import * as React from "react";
import { createRoot } from "react-dom/client";
import "./ConfirmDialog.sass";
import { IPositionCalculatorOptions, RelativePositionPresets } from "../Positioner";
import { CommonIcons } from "../lib/CommonIcons";
import { IOption } from "../fields";
import FocusLock from "react-focus-lock";

export interface IConfirmDialogCompProps {
    title: string;
    question: string;
    options: IOption[];
    onSelect: (value: string | number | boolean) => any;
    onAbort?: () => any;
    layer?: boolean;
    relativeTo?: HTMLElement;
    relativeSettings?: IPositionCalculatorOptions;
}
const ConfirmDialogComp = ({
    title,
    question,
    options,
    onSelect,
    layer,
    relativeTo,
    relativeSettings,
    onAbort,
}: IConfirmDialogCompProps) => {
    relativeSettings = relativeSettings ?? RelativePositionPresets.bottomRight;

    return (
        <Modal
            show={true}
            title={title}
            showHideLink={title ? true : false}
            relativeTo={relativeTo ? () => relativeTo : undefined}
            shadow={relativeTo ? false : true}
            relativeSettings={relativeSettings}
            layer={layer ?? true}
            icon={CommonIcons.info}
            onHide={() => {
                console.log(onAbort, "abort 1");
                onAbort && onAbort();
            }}
        >
            <div className={"w-modal-confirm"}>
                <div style={{ padding: 10 }}>{question}</div>
                <FocusLock autoFocus={true}>
                    <div style={{ padding: 5, textAlign: "right" }}>
                        {options.map((el) => (
                            <button
                                key={el.value + ""}
                                onClick={() => {
                                    onSelect(el.value);
                                }}
                            >
                                {el.label}
                            </button>
                        ))}
                    </div>
                </FocusLock>
            </div>
        </Modal>
    );
};

export default ConfirmDialogComp;

export const confirmDialog = async (message: string, options: Partial<IConfirmDialogCompProps> = {}) => {
    console.log(options.onAbort, "abort 0");
    return new Promise((resolve) => {
        console.log(options.onAbort, "abort 0.6");
        const wrapper = document.body.appendChild(document.createElement("div"));

        const cleanup = () => {
            root.unmount();
            wrapper.remove();
        };

        const x: any = (
            <ConfirmDialogComp
                title={undefined}
                question={message}
                onSelect={(val) => {
                    console.log(options.onAbort, "abort 3");
                    console.log("selected");
                    cleanup();
                    resolve(val);
                }}
                onAbort={() => {
                    console.log(options.onAbort, "abort 2");
                    if (options.onAbort) {
                        options.onAbort();
                    }
                    cleanup();
                    resolve(null);
                }}
                options={[
                    { value: true, label: "yes" },
                    { value: false, label: "no" },
                ]}
                {...options}
            />
        );
        const root = createRoot(wrapper);
        root.render(x);
    });
};
