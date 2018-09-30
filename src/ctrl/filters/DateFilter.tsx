import * as React from "react";

import { fI18n } from "../../utils/I18n";
import AbstractFilter, { IFilterProps } from "./AbstractFilter";

import "./DateFilter.sass";
import { LoadingIndicator } from "../LoadingIndicator";
import Icon from "../Icon";
import { Positioner } from "../overlays/Positioner";

interface IDateFilterProps extends IFilterProps {
    config: {
        /*showFilterOptions?: boolean;
        disableAutoFocus?: boolean;*/
    };
}
export default class DateFilter extends AbstractFilter<IDateFilterProps> {
    public datepicker: any;
    public choiceTypes: { [index: string]: string } = { "<x<in": "range", ">": "exists", IN: "not-exists" };

    constructor(props: IDateFilterProps) {
        super(props);

        this.state = {
            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null,
            libsLoaded: false,
            choiceType: props.value ? this.choiceTypes[props.value.condition] : "range", // exists, not-exists
        };

        this.datepicker = null;
    }

    public componentWillMount() {
        Promise.all([
            import("moment"), // @ts-ignore
            import("moment/locale/pl"), // @ts-ignore
            import("react-dates"), // @ts-ignore
            import("react-dates/lib/css/_datepicker.css"),
            import("react-dates/initialize"),
        ]).then(([moment, locale, datePickerImp]) => {
            console.log(datePickerImp);

            // @ts-ignore
            moment = moment.default;
            this.datepicker = datePickerImp.DateRangePicker;

            this.setState({
                // @ts-ignore
                startDate: moment(),
                // @ts-ignore
                endDate: moment(),
                // @ts-ignore
                startTime: moment().startOf("day"),
                // @ts-ignore
                endTime: moment().endOf("day"),
                libsLoaded: true,
            });
        });
    }

    public componentWillReceiveProps(nextProps: IDateFilterProps) {
        this.setState({
            choiceType: nextProps.value ? this.choiceTypes[nextProps.value.condition] : "range",
        });
    }

    public getValue() {
        const dateStart = this.state.startDate.format("YYYY-MM-DD");
        const timeStart = this.state.startTime.format("HH:mm:ss");
        const dateStop = this.state.endDate.format("YYYY-MM-DD");
        const timeStop = this.state.endTime.format("HH:mm:ss");

        const separatorI = '<i class="fa fa-arrow-right" />';
        const calendarI = ""; // '<i class="fa fa-calendar-o"></i>';
        const clockI = '<i class="fa fa-clock-o" />';

        const val = `${dateStart} ${timeStart} : ${dateStop} ${timeStop}`;
        let label = `${calendarI} ${dateStart} ${clockI} ${timeStart} ${separatorI} ${calendarI} ${dateStop} ${clockI} ${timeStop}`;
        if (timeStart == "00:00:00" && timeStop == "23:59:59") {
            label = `${dateStart} ${separatorI} ${dateStop}`;
        }

        let applyVal: string | string[] = "";
        let condition: string;

        if (this.state.choiceType == "range") {
            condition = "<x<in";
            applyVal = val;
        } else if (this.state.choiceType == "exists") {
            condition = ">";
            applyVal = "0000-00-00 00:00:00";
            label = fI18n.t("frontend:filters.date.dateIsSet");
        } else if (this.state.choiceType == "not-exists") {
            condition = "IN";
            applyVal = ["0000-00-00 00:00:00", null, ""];
            label = fI18n.t("frontend:filters.date.dateIsNotSet");
        }

        return {
            field: this.props.field,
            value: applyVal,
            condition,
            caption: this.props.caption,
            labelCaptionSeparator: ":",
            label,
        };
    }

    public handleChange = () => {
        if (this.state.startDate && this.state.endDate && this.props.onChange) {
            this.props.onChange(this.getValue());
        }
    };

    public handleApply = () => {
        this.setState({ show: false });
        if (this.props.onApply) {
            this.props.onApply(this.getValue());
        }
    };

    public render() {
        const { caption } = this.props;
        if (this.state.libsLoaded == false) {
            return (
                <div className={"w-filter w-filter-date"}>
                    <LoadingIndicator />
                </div>
            );
        }

        const s = this.state;
        return (
            <div className={"w-filter w-filter-date"}>
                {caption != "" && <div className={"w-filter-title"}>{caption}</div>}
                {/*<Positioner>*/}
                    <div style={{ display: s.choiceType != "range" ? "none" : "block" }} >
                        <this.datepicker
                            startDate={this.state.startDate}
                            startDateId="your_unique_start_date_id"
                            endDateId="your_unique_end_date_id"
                            endDate={this.state.endDate}
                            onDatesChange={({ startDate, endDate }: any) => {
                                this.setState({ startDate, endDate }, () => {
                                    if (startDate && endDate) {
                                        this.handleChange();
                                    }
                                });
                            }}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={(focusedInput: any) => {
                                this.setState({ focusedInput });
                            }}
                            startDatePlaceholderText="Data od"
                            endDatePlaceholderText="Data do"
                            minimumNights={0}
                            isOutsideRange={() => {
                                return false;
                            }}
                            renderCalendarInfo={() => false}
                        />
                    </div>
                {/*</Positioner>*/}
                <div className="w-filter-date-exists">
                    <div>
                        <label>
                            <input
                                checked={s.choiceType == "range"}
                                onChange={(e) => this.setState({ choiceType: "range" }, this.handleChange)}
                                type="checkbox"
                            />{" "}
                            <Icon name={"ScrollUpDown"} /> Według wybou
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                checked={s.choiceType == "exists"}
                                onChange={(e) => this.setState({ choiceType: "exists" }, this.handleChange)}
                                type="checkbox"
                            />{" "}
                            <Icon name={"CheckMark"} /> Data ustalona
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                                checked={s.choiceType == "not-exists"}
                                onChange={(e) => this.setState({ choiceType: "not-exists" }, this.handleChange)}
                                type="checkbox"
                            />{" "}
                            <Icon name={"Clear"} /> Brak daty
                        </label>
                    </div>
                </div>

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
