import * as React from "react";
import { BDate, BForm, BSelect, BSwitch, BText, BTextarea, IFormFieldsErrorSet } from "../BForm";
import { IFieldChangeEvent, IOption } from "../fields";
import { PrintJSON } from "../PrintJSON";
import { fI18n } from "../lib";

interface IFieldConfig {
    name: string;
    label: string;
    type: string;
    default?: string | number;
    options?: IOption[];
}

export interface IFormBuilderProps {
    fields: IFieldConfig[];
    values?: any;
    onChange?: (data: { [index: string]: string | number }) => any;
}

interface IState {
    currentField: any;
    formErrors: Map<string, string[]>;
}

export class FormBuilderSchemaGenerator extends React.Component<IFormBuilderProps, IState> {
    public static defaultProps: Partial<IFormBuilderProps> = {
        values: [],
    };

    constructor(props: IFormBuilderProps) {
        super(props);

        this.state = {
            currentField: {
                type: "BText",
            },
            formErrors: new Map<string, string[]>(),
        };
    }

    private handleAddField = () => {
        const { currentField } = this.state;
        const errors: Map<string, string[]> = new Map<string, string[]>();
        console.log(errors, "__tutaj");
        if (this.props.onChange) {
            if (!currentField.name) {
              console.log(errors, "__tutaj");
                errors.set("name", ["Pole wymagane"]);
                errors.set("name", ["Pole wymaganexxx"]);
console.log(errors, "_tutaj");
            }

            if (errors.size == 0) {

                this.props.onChange(this.props.values.concat(this.state.currentField));
            } else {
                console.log(errors, "tutaj");
                this.setState({ formErrors: errors });
            }
        }
    };

    public render() {
        const fieldsConf = [
            { type: "BText", label: "Tekstowe", options: false },
            { type: "BTextarea", label: "Tekstowe wiele lini", options: false },
            { type: "BDate", label: "Data", options: false },
            { type: "BSelect", label: "Jednokrotnego wyboru [lista]", options: true },
            { type: "BSwitch", label: "Jednokrotnego wyboru [przełącznik]", options: true },
            { type: "BCheckboxList", label: "Wielokrotnego wyboru", options: true },
        ];
        const currentConfig = fieldsConf.filter((el) => el.type == this.state.currentField.type)[0];

        return (
            <div className="w-form-builder-schema-generator">
                <BForm
                    data={this.state.currentField}
                    onChange={(event) => this.setState({ currentField: event.form.getData() })}
                    fieldErrors={this.state.formErrors}
                >
                    {(form) => (
                        <>
                            <BSelect
                                label={fI18n.t("frontend:formBuilder.fieldType")}
                                options={fieldsConf.map((el) => ({ value: el.type, label: el.label }))}
                                {...form("type", "BText")}
                            />
                            <BText label={fI18n.t("frontend:formBuilder.name")} {...form("name")} />
                            <BText label={fI18n.t("frontend:formBuilder.label")} {...form("label")} />
                            <BSwitch
                                label={fI18n.t("frontend:formBuilder.required")}
                                options={[{ value: 0, label: "Nie" }, { value: 1, label: "Tak" }]}
                                {...form("required", 0)}
                            />

                            <BText label={fI18n.t("frontend:formBuilder.default")} {...form("default")} />
                            {currentConfig.options && (
                                <>
                                    <BTextarea
                                        label={fI18n.t("frontend:formBuilder.fieldOptions")}
                                        help={"Format: oddzielne linie w fromacie wartoś;etykieta"}
                                        style={{ height: 250 }}
                                    />
                                </>
                            )}
                            <BText
                                label={fI18n.t("frontend:formBuilder.rowConfig")}
                                help={"Nie obowiązkowe. Nr wiersza + ilość zajmowanego miejsca ( od 1 do 12 )"}
                                {...form("layoutConfig")}
                            />
                            <button
                                style={{ width: "100%" }}
                                className="btn btn-primary "
                                onClick={this.handleAddField}
                            >
                                {fI18n.t("frontend:add")}
                            </button>
                        </>
                    )}
                </BForm>
                <PrintJSON json={this.state.currentField} />
                <PrintJSON json={currentConfig} />
                <hr />
                To są errory
                <PrintJSON json={this.state.formErrors} />
                <PrintJSON json={{ x: 1, ...this.state.formErrors.entries() }} />
            </div>
        );
    }
}
