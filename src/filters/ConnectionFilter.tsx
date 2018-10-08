import * as React from "react";
import { fI18n } from "../lib/I18n";
import AbstractFilter, { IFilterProps } from "./AbstractFilter";
import "./ConnectionField.sass";
import { ConnectionsField, IConnectionChangeEvent } from "../fields/ConnectionsField/ConnectionsField";

interface IConnectionFilterProps extends IFilterProps {
    config: {
        showFilterOptions?: boolean;
        disableAutoFocus?: boolean;
    };
}

export default class ConnectionFilter extends AbstractFilter<IConnectionFilterProps> {
    constructor(props: IConnectionFilterProps) {
        super(props);
        this.state = {
            searchValue: null,
            searchLabel: null,
        };
    }

    public getValue() {
        return {
            field: this.props.field,
            value: this.state.searchValue[0],
            condition: "=",
            caption: this.props.caption,
            labelCaptionSeparator: " :",
            label: this.state.searchLabel,
        };
    }

    public handleChange = (event: IConnectionChangeEvent) => {
        this.setState(
            {
                searchValue: event.value,
                searchLabel: event.items.length > 0 ? event.items[0].label : null,
            },
            () => {
                if (this.props.onChange != null) {
                    this.props.onChange(this.getValue());
                }
            },
        );
    };

    public handleApply = () => {
        this.setState({ show: false });
        if (this.state.searchValue && this.props.onApply) {
            this.props.onApply(this.getValue());
        }
    };

    public _handleKeyPress(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            this.handleApply();
        }
    }

    public render() {
        const { config, caption } = this.props;
        return (
            <div className={"w-filter w-filter-connection-field "}>
                {caption != "" && <div className={"w-filter-title"}>{caption}</div>}
                <ConnectionsField
                    {...config}
                    editable={true}
                    items={[]}
                    onChange={this.handleChange}
                    searchWithoutPhrase={true}
                />

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
