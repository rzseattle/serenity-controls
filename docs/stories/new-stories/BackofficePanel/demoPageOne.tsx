import { Navbar } from "../../../../src/Navbar";
import React, { useRef, useState } from "react";
import { CommandBar } from "../../../../src/CommandBar";
import { getPanelContext } from "../../../../src/backoffice/PanelContext";
import { Table, ColumnHelper as Col, IDataQuery, ITableDataInput } from "../../../../src/Table";
import { mockData } from "../Table/MOCK_DATA";
import { FilterHelper } from "../../../../src/filters";
import { Icon } from "../../../../src/Icon";
import { confirmDialog } from "../../../../src/ConfirmDialog";
import { Modal } from "../../../../src/Modal";
import { BDate, BForm, BSwitch, BText } from "../../../../src/BForm";

const provider = (query: IDataQuery) => {
    return new Promise<ITableDataInput>((resolve) => {
        resolve({
            data: mockData.slice((query.currentPage - 1) * query.onPage, query.currentPage * query.onPage) as any[],
            countAll: mockData.length,
            debug: false,
        });
    });
};

export default () => {
    const context = getPanelContext();
    const [editData, setEditData] = useState<Record<string, any> | null>(null);
    const [infoVisible, setInfoVisible] = useState<boolean>(true);
    const table = useRef<Table>();

    const baseColumns = [
        Col.id("id", "Id"),
        Col.email("email", "Email"),
        Col.text("first_name", "Name")
            .template((field, row) => (
                <div>
                    {row.first_name} {row.last_name}
                </div>
            ))
            .onClick((row, column, event) => {
                // alert(row[column.field] + " Cell:" + (event as React.MouseEvent<HTMLTableCellElement>).target);
            })
            .noFilter()
            .addFilter(FilterHelper.text("first_name", "First name").get())
            .addFilter(FilterHelper.text("last_name", "Last name").get()),
        Col.hidden("last_name"),
        Col.text("gender", "Gender")
            .noFilter()
            .addFilter(
                FilterHelper.select("gender", "Gender", [
                    { value: "0", label: "All" },
                    { value: "Female", label: "Female" },
                    { value: "Male", label: "Male" },
                ]).get(),
            )
            .headerTooltip("La gender machen"),
        Col.text("ip_address", "Ip").className("right"),
        Col.date("date", "Date"),
        Col.money("price", "Price")
            .append(" $")
            .prepend(" - ")
            .set({
                classTemplate: (row, column) => [parseFloat(row.price) < 100 ? "darkgreen" : "darkred"],
                styleTemplate: (row, column) =>
                    parseFloat(row.price) < 100 ? { fontSize: "10px" } : { fontSize: "15px" },
            }),

        Col.template("", () => <Icon name={"Edit"} />)
            .className("center darkgreen")
            .onClick((row) => {
                setEditData(row);
            }),

        Col.template("", () => <Icon name={"Delete"} />)
            .className("center darkred")
            .onClick((row) => {
                confirmDialog("Are I sure to delete " + row.email + "?").then(() => {
                    context.notification(row.email, "Removed", { level: "error" });
                    table.current.load();
                });
            }),
    ];

    return (
        <>
            <CommandBar
                items={[
                    {
                        key: "f1",
                        label: "Add new item",
                        icon: "Add",
                        onClick: () => {
                            context.notification("Item xxx added", "Information");
                        },
                    },
                ]}
            ></CommandBar>
            <Navbar>
                <span>Backoffice</span>
                <span>Path </span>
            </Navbar>
            <div style={{ margin: "0 10px" }}>
                <Table dataProvider={provider} columns={baseColumns} ref={table} />
            </div>

            <Modal
                show={infoVisible}
                title={"Info"}
                showHideLink={true}
                onHide={() => setInfoVisible(false)}
                icon="Edit"
            >
                <div style={{ width: 400, padding: 15 }}>
                    <b>Use:</b>
                    <ul>
                        <li>Add new item</li>
                        <li>Edit</li>
                        <li>Delete</li>
                    </ul>
                </div>
            </Modal>

            <Modal
                show={editData !== null}
                title={"Edit"}
                showHideLink={true}
                onHide={() => setEditData(null)}
                icon="Edit"
            >
                <div style={{ width: 400, padding: 15 }}>
                    <BForm
                        data={editData}
                        onSubmit={() => {
                            context.notification("Fake save of " + editData.email, "Item added");
                            setEditData(null);
                            table.current.load();
                        }}
                    >
                        {(form) => {
                            return (
                                <>
                                    <BText label={"Name"} {...form("first_name")} />
                                    <BSwitch
                                        label={"Gender"}
                                        {...form("gender")}
                                        options={[
                                            { value: "Male", label: "Male" },
                                            { value: "Female", label: "Female" },
                                        ]}
                                    />
                                    <BDate {...form("date")} label={"Date"} />

                                    <hr />
                                    <div style={{ textAlign: "right" }}>
                                        <input type="submit" className="btn btn-primary" value="Save" />
                                        <input
                                            type="button"
                                            className="btn btn-default"
                                            value="Cancel"
                                            onClick={() => setEditData(null)}
                                        />
                                    </div>
                                </>
                            );
                        }}
                    </BForm>
                </div>
            </Modal>
        </>
    );
};
