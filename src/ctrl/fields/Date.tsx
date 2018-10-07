import {IFieldProps} from "./Interfaces";
import * as React from "react";
import {fI18n} from "../../utils/I18n";
import {Moment} from "moment";

let datePicker: any = null;
let moment: any = null;

interface IDateProps extends IFieldProps {
    value: string;
    placeholder?: string;
}

export class Date extends React.Component<IDateProps, any> {
    public static defaultProps = {
        editable: true,
    };

    constructor(props: IDateProps) {
        super(props);
        this.state = {
            value: null,
            date: null,
            libsLoaded: false,
        };
    }

    public componentWillMount() {
        // prettier-ignore
        Promise.all([
            import("moment"),
            // @ts-ignore
            import("moment/locale/pl"),
            import("react-dates"), // @ts-ignore
            // @ts-ignore
            import("react-dates/lib/css/_datepicker.css"),
            // @ts-ignore
            import( "react-dates/initialize"),
        ]).then((imported) => {
            moment = imported[0].default;
            datePicker = imported[2];
            this.setState({
                date:
                    this.props.value && this.props.value != "0000-00-00"
                        ? moment(this.props.value, "YYYY-MM-DD")
                        : null,
                libsLoaded: true,
            });
        });
    }

    public componentWillReceiveProps(nextProps: Readonly<IDateProps>, nextContext: any): void {
        // prettier-ignore
        Promise.all([
            import("moment"),
            // @ts-ignore
            import("moment/locale/pl"),
        ]).then((imported) => {
            moment = imported[0].default;
            this.setState({
                date: nextProps.value && nextProps.value != "0000-00-00" ? moment(nextProps.value, "YYYY-MM-DD") : null,
            });
        });
    }

    public handleOnChange(date: Moment) {
        this.setState({date, value: date});

        // this.refs.hidden.value = date;
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "date",
                value: date ? date.format("YYYY-MM-DD") : null,
                event: null,
                data: date,
            });
        }
    }

    public render() {
        const props = this.props;

        if (!props.editable) {
            return <div className="w-field-presentation w-field-presentation-date">{props.value}</div>;
        }
        if (this.state.libsLoaded == false) {
            return (
                <div className={"w-filter w-filter-date"}>
                    <div>
                        <i className="fa fa-cog fa-spin"/>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <datePicker.SingleDatePicker
                    numberOfMonths={1}
                    displayFormat="YYYY-MM-DD"
                    date={this.state.date}
                    onDateChange={(date: Moment) => this.handleOnChange(date)}
                    focused={this.state.focused}
                    onFocusChange={({focused}: any) => this.setState({focused})}
                    isOutsideRange={() => false}
                    disabled={props.disabled}
                    placeholder={props.placeholder ? props.placeholder : fI18n.t("frontend:fields.date.fillDate")}
                />
            </div>
        );
    }
}
