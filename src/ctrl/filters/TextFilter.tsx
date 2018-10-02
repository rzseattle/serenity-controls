import * as React from "react";
import { fI18n } from "../../utils/I18n";
import AbstractFilter, { IFilterProps } from "./AbstractFilter";

import "./TextFilter.sass";

interface ITextFilterProps extends IFilterProps {
    config: {
        showFilterOptions?: boolean;
        disableAutoFocus?: boolean;
    };
}

export default class TextFilter extends AbstractFilter<ITextFilterProps> {
    public options: { [index: string]: string };

    public input = React.createRef<HTMLInputElement>();

    public static defaultProps: Partial<ITextFilterProps> = {
        caption: "",
        config: {
            showFilterOptions: true,
            disableAutoFocus: false,
        },
    };

    constructor(props: ITextFilterProps) {
        super(props);

        this.state = {
            option: props.value ? props.value.condition : "LIKE",
            searchText: props.value ? props.value.value : "",
        };
        this.options = {
            "LIKE": fI18n.t("frontend:filters.text.like"),
            "==": fI18n.t("frontend:filters.text.equals"),
            "!=": fI18n.t("frontend:filters.text.differentThan"),
            "NOT LIKE": fI18n.t("frontend:filters.text.notLike"),
            "^%": fI18n.t("frontend:filters.text.startsWith"),
            "%$": fI18n.t("frontend:filters.text.endsWith"),
        };
    }

    public componentDidMount(): void {
        if (!this.props.config.disableAutoFocus) {
            setTimeout(() => {
                this.input.current.focus();
            }, 10);
        }
    }

    public componentWillReceiveProps(nextProps: ITextFilterProps) {
        this.setState({
            option: nextProps.value ? nextProps.value.condition : "LIKE",
            searchText: nextProps.value ? nextProps.value.value : "",
        });
    }

    public getValue() {
        return {
            field: this.props.field,
            value: this.state.searchText,
            condition: this.state.option,
            caption: this.props.caption,
            labelCaptionSeparator: this.options[this.state.option] + " :",
            label: this.state.searchText,
        };
    }

    public handleChange() {
        if (this.props.onChange) {
            this.props.onChange(this.getValue());
        }
    }

    public handleApply = () => {
        this.setState({ show: false });
        if (this.state.searchText && this.props.onApply) {
            this.props.onApply(this.getValue());
        }
        if (this.props.onChange) {
            this.props.onChange(this.getValue());
        }
    };

    public handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ searchText: e.currentTarget.value }, this.handleChange);
    };

    public handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
        this.setState({ option: e.currentTarget.value }, this.handleChange);
    };

    public handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            this.handleApply();
        }
    };

    public render() {
        const { config, caption } = this.props;

        return (
            <div className="w-filter w-filter-text">
                {caption != "" && <div className={"w-filter-title"}>{caption}</div>}
                <input
                    type="text"
                    value={this.state.searchText}
                    onChange={this.handleInputChange}
                    /*autoFocus={config.disableAutoFocus !== true}*/
                    onKeyPress={this.handleKeyPress}
                    ref={this.input}
                />

                {this.props.config.showFilterOptions && (
                    <select onChange={this.handleSelectChange} value={this.state.option}>
                        {Object.entries(this.options).map(([key, val]) => (
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
