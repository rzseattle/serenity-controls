import * as React from "react";

import {fI18n} from "../../utils/I18n";
import AbstractFilter, {IFilterProps} from "./AbstractFilter";

import "./NumericFilter.sass";

interface INumericFilterProps extends IFilterProps {
    config: {
        showFilterOptions?: boolean;
        disableAutoFocus?: boolean;
    };
}

export default class NumericFilter extends AbstractFilter<INumericFilterProps> {
    public input2: HTMLInputElement;
    public input1: HTMLInputElement;
    public input3: HTMLTextAreaElement;


    constructor(props: INumericFilterProps) {
        super(props);
        this.state = {option: "LIKE"};
    }

    public componentDidMount(): void {
        if (!this.props.config.disableAutoFocus) {
            setTimeout(() => {
                this.input1.focus();
            }, 10);
        }
    }

    public getValue() {
        let val;
        let label;
        if (this.state.option != "IN") {
            val = this.input1.value;
            if (this.state.option == "<x<") {
                val += "-" + this.input2.value;
            }
            label = val;
        } else {
            val = this.input3.value.split("\n");
            label = val.join(", ");
            if (label.length > 50) {
                label = label.substring(0, 50) + "....";
            }
        }

        return {
            field: this.props.field,
            value: val,
            condition: this.state.option,
            caption: this.props.caption,
            labelCaptionSeparator: ":",
            label,
        };
    }

    public handleApply = () => {
        this.setState({show: false});

        if (this.props.onApply) {
            this.props.onApply(this.getValue());
        }

        if (this.props.onChange) {
            this.props.onChange(this.getValue());
        }
    };

    public handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            this.handleApply();
        }
    };

    public render() {
        const options = {
            "LIKE": fI18n.t("frontend:filters.numeric.like"),
            "==": fI18n.t("frontend:filters.numeric.equal"),
            "<": fI18n.t("frontend:filters.numeric.smaller"),
            "<=": fI18n.t("frontend:filters.numeric.smallerEqual"),
            ">": fI18n.t("frontend:filters.numeric.greater"),
            ">=": fI18n.t("frontend:filters.numeric.greaterEqual"),
            "<x<": fI18n.t("frontend:filters.numeric.between"),
            "IN": fI18n.t("frontend:filters.numeric.in"),
        };

        const {config, caption} = this.props;

        return (
            <div className="w-filter w-filter-numeric">
                {caption != "" && <div className={"w-filter-title"}>{caption}</div>}
                {this.state.option == "<x<" && <div className="w-filter-label">Od</div>}

                {this.state.option != "IN" ? (
                    <input
                        type="text"
                        autoFocus={config.disableAutoFocus === true}
                        ref={(el) => (this.input1 = el)}
                        onKeyPress={this.handleKeyPress}
                    />
                ) : (
                    <textarea autoFocus={config.disableAutoFocus === true} ref={(el) => (this.input3 = el)}/>
                )}

                {this.state.option == "<x<" && (
                    <div className="w-filter-label">
                        {fI18n.t("frontend:filters.to")}
                        <input type="text" ref={(el) => (this.input2 = el)} onKeyPress={this.handleKeyPress}/>
                    </div>
                )}
                {this.props.config.showFilterOptions && (
                    <select
                        onChange={(e) => this.setState({option: e.currentTarget.value})}
                        value={this.state.option}
                    >
                        {Object.entries(options).map(([key, val]) => (
                            <option value={key} key={key}>
                                {val}
                            </option>
                        ))}
                    </select>
                )}
                {this.props.showApply && (
                    <div>
                        <button className="w-filter-apply" onClick={this.handleApply}>
                            {fI18n.t("frontend:filters.apply")}
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
