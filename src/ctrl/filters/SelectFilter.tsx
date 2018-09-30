import * as React from "react";
import {fI18n} from "../../utils/I18n";
import AbstractFilter, {IFilterProps} from "./AbstractFilter";
import {IOption} from "../fields/Interfaces";
import ReactDOM from "react-dom";

import "./SelectFilter.sass";

export interface ISelectFilterProps extends IFilterProps {
    config: {
        content: IOption[];
        default?: string | number;
        multiselect?: boolean;
        disableAutoFocus?: boolean;
    };
}

export default class SelectFilter extends AbstractFilter<ISelectFilterProps> {
    public select: any;

    public static defaultProps: Partial<ISelectFilterProps> = {
        caption: "",
        config: {
            content: [],
            default: "",
            multiselect: false,
            disableAutoFocus: false,
        },
    };

    constructor(props: ISelectFilterProps) {
        super(props);
        let value: any = "";
        if (props.value) {
            value = props.value;
        }
        if (props.config.multiselect && value == "") {
            value = [];
        }

        this.state = {
            value,
        };
    }

    public componentWillReceiveProps(nextProps: ISelectFilterProps) {
        let value: any = "";
        if (nextProps.value) {
            value = nextProps.value.value;
        } else {
            value = this.props.config.default;
        }
        if (this.props.config.multiselect && value == "") {
            value = [];
        }

        this.setState({
            value,
        });
    }

    public getValue() {
        const select = ReactDOM.findDOMNode(this.select) as HTMLSelectElement;

        let values = [].filter
            .call(select.options, (o: HTMLOptionElement) => {
                return o.selected;
            })
            .map((o: HTMLOptionElement) => {
                return o.value;
            });
        const labels = [].filter
            .call(select.options, (o: HTMLOptionElement) => {
                return o.selected;
            })
            .map((o: HTMLOptionElement) => {
                return o.innerHTML;
            });

        values = this.props.config.multiselect ? values : values[0];
        const condition = this.props.config.multiselect ? "IN" : "==";
        return {
            field: this.props.field,
            value: values,
            condition,
            caption: this.props.caption,
            labelCaptionSeparator: ":",
            label: labels.join(", "),
        };
    }

    public handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            value: this.getValue().value,
        });

        if (this.props.onChange) {
            this.props.onChange(this.getValue());
        }
    };

    public handleApply = () => {
        this.setState({show: false});
        if (this.props.onApply) {
            this.props.onApply(this.getValue());
        }
    };

    public render() {
        const {config, caption} = this.props;
        let content: IOption[];
        if (!Array.isArray(this.props.config.content)) {
            content = Object.entries(this.props.config.content).map(([value, label]) => ({
                value,
                label,
            })) as IOption[];
        } else {
            content = this.props.config.content;
        }

        return (
            <div className={"w-filter w-filter-select"}>
                {caption != "" && <div className={"w-filter-title"}>{caption}</div>}
                <select
                    autoFocus={config.disableAutoFocus === true}
                    ref={(el) => (this.select = el)}
                    multiple={this.props.config.multiselect}
                    size={this.props.config.multiselect ? Object.keys(this.props.config.content).length : 1}
                    onChange={this.handleChange}
                    value={this.state.value}
                >
                    {!this.props.config.multiselect && (
                        <option key={"-1default"} value="">
                            {fI18n.t("frontend:filters.select.chooseOption")}
                        </option>
                    )}
                    {content.map((el) => (
                        <option
                            key={el.value}
                            value={el.value}
                            onMouseDown={(e: React.MouseEvent<HTMLOptionElement>) => {
                                if (this.props.config.multiselect) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    e.currentTarget.selected = !e.currentTarget.selected;
                                    return false;
                                }
                            }}
                        >
                            {el.label}
                        </option>
                    ))}
                </select>
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
