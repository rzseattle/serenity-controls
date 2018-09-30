import * as React from "react";
import { IFilterComponent } from "./Filters";
import { fI18n } from "../../utils/I18n";
import AbstractFilter, { IFilterProps } from "./AbstractFilter";
import {BConnectionsField} from "../../layout/BootstrapForm";

export default class ConnectionFilter extends AbstractFilter implements IFilterComponent {
    constructor(props: IFilterProps) {
        super(props);
        this.state = {
            searchValue: null,
            searchLabel: null,
        };
    }

    public getValue() {
        return {
            field: this.props.field,
            value: this.state.searchValue,
            condition: "=",
            caption: this.props.caption,
            labelCaptionSeparator: " :",
            label: this.state.searchLabel,
        };
    }

    public handleChange(event) {
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
    }

    public handleApply() {
        this.setState({ show: false });
        if (this.state.searchValue && this.props.onApply) {
            this.props.onApply(this.getValue());
        }
    }

    public _handleKeyPress(e) {
        if (e.key === "Enter") {
            this.handleApply();
        }
    }

    public render() {
        return (
            <div className={"w-filter w-filter-text "} ref="body">
                <BConnectionsField
                    {...this.props.config}
                    editable={true}
                    items={[]}
                    onChange={this.handleChange.bind(this)}
                />

                {this.props.showApply && (
                    <div>
                        <button className="w-filter-apply" onClick={this.handleApply.bind(this)}>
                            {fI18n.t("frontend:filters.apply")}
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
