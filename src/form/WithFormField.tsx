import * as React from "react";
import { Copyable } from "../utils";
import { Icon } from "../common";

export interface IWithBootstrapFormFieldProps {
    /**
     * Label of field
     */
    label?: string;
    onInfoClick?: (value: any) => any;
    help?: string;
    errors?: string[];
    className?: string;
    prefix?: string;
    suffix?: string;
    layoutType?: string; // "horizontal" | "default";
    addInputClass: boolean;
    editable?: boolean;
    copyable?: boolean;
    disabledClass?: string;
    labelClass?: string;
    forwardedRef?: any;
    value?: any;
}

export const withFormField = <P extends object>(Component: React.ComponentType<P>) =>
    class WithBootstrap extends React.Component<P & IWithBootstrapFormFieldProps, any> {
        public static defaultProps: Partial<IWithBootstrapFormFieldProps> = {
            layoutType: "default",
            addInputClass: true,
        };

        public render() {
            const props = this.props;
            const addInputClass = this.props.addInputClass;
            const classes = ["form-group"];

            if (this.props.errors) {
                classes.push("has-error");
            }

            let className = addInputClass ? "form-control" : "";
            if (props.className) {
                className += " " + props.className;
            }

            let field;

            const { forwardedRef, ...fieldProps } = this.props as any;

            // const fieldProps: any = {};
            Object.assign(fieldProps, { className });

            if ((this.props.suffix || this.props.prefix) && this.props.editable) {
                field = (
                    <div className="input-group">
                        {this.props.prefix && <div className="input-group-addon">{this.props.prefix}</div>}
                        <Component {...props} ref={forwardedRef} {...fieldProps} />
                        {this.props.suffix && <div className="input-group-addon">{this.props.suffix}</div>}
                    </div>
                );
            } else {
                field = <Component ref={forwardedRef} {...fieldProps} />;
            }
            let errors: any[] = [];
            if (props.errors) {
                if (!Array.isArray(props.errors)) {
                    errors = [props.errors];
                } else {
                    errors = props.errors;
                }
            }

            if (props.layoutType == "horizontal") {
                return (
                    <div className={classes.join(" ")}>
                        {this.props.label && <label className="col-sm-2 control-label">{props.label}</label>}
                        <div className="col-sm-10">
                            {field}
                            {props.help ? <span className="help-block">{props.help} </span> : ""}
                            {props.errors && this.props.editable ? (
                                <span className="help-block">{errors.join(", ")} </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                );
            }
            if (props.layoutType == "default") {
                return (
                    <div className={classes.join(" ")}>
                        {this.props.label && (
                            <label className={this.props.labelClass}>
                                {this.props.label}
                                {this.props.copyable && <Copyable toCopy={this.props.value} />}

                                {props.onInfoClick && (
                                    <a style={{ float: "right" }} onClick={props.onInfoClick}>
                                        <Icon name={"OpenInNewWindow"} />
                                    </a>
                                )}
                            </label>
                        )}
                        {field}

                        {props.help ? <span className="help-block">{props.help} </span> : ""}
                        {props.errors && this.props.editable ? (
                            <span className="help-block">{errors.join(", ")} </span>
                        ) : (
                            ""
                        )}
                        {/*.join(", ")*/}
                    </div>
                );
            }
        }
    };
