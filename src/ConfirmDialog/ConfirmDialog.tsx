import { Modal } from "../Modal";
import * as React from "react";
import ReactDOM from "react-dom";
import "./ConfirmDialog.sass";
import { IPositionCalculatorOptions, RelativePositionPresets } from "../Positioner";
import { CommonIcons } from "../lib/CommonIcons";
import { IOption } from "../fields";

export interface IConfirmDialogCompProps {
    title: string;
    question: string;
    options: IOption[];
    onSelect: (value: string | number | boolean) => any;
    onAbort: () => any;
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
            onHide={() => onAbort()}
        >
            <div style={{ padding: 10 }}>{question}</div>
            <div style={{ padding: 5, textAlign: "right" }}>
                {options.map((el) => (
                    <button
                        key={el.value + ""}
                        style={{ margin: 4, cursor: "pointer", padding: "3px 6px" }}
                        onClick={() => {
                            onSelect(el.value);
                        }}
                    >
                        {el.label}
                    </button>
                ))}
            </div>
        </Modal>
    );
};

export default ConfirmDialogComp;

export const confirmDialog = async (message: string, options: Partial<IConfirmDialogCompProps> = {}) => {
    return new Promise((resolve) => {
        const wrapper = document.body.appendChild(document.createElement("div"));

        const cleanup = () => {
            ReactDOM.unmountComponentAtNode(wrapper);
            wrapper.remove();
        };

        const x: any = (
            <ConfirmDialogComp
                title={undefined}
                question={message}
                onSelect={(val) => {
                    cleanup();
                    resolve(val);
                }}
                onAbort={() => {
                    cleanup();
                    resolve(undefined);
                }}
                options={[
                    { value: true, label: "yes" },
                    { value: false, label: "no" },
                ]}
                {...options}
            />
        );

        ReactDOM.render(x, wrapper);
    });
};
