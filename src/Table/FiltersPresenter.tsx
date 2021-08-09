import * as React from "react";
import { ArrowDownward, ArrowUpward, Close, FilterList } from "@material-ui/icons";

export default function (props: any) {
    const isVisible: boolean = Object.entries(props.order).length > 0 || Object.entries(props.filters).length > 0;
    return (
        <div className={"w-table-presenter " + (!isVisible ? "w-table-presenter-hidden" : "")}>
            <div className="w-table-presenter-inner">
                {Object.entries(props.order).map(([field, el]: any, index) => (
                    <div key={index}>
                        <div>{el.dir == "asc" ? <ArrowDownward /> : <ArrowUpward />}</div>
                        <div className="caption">{el.caption}</div>
                        <div className="remove" onClick={(e) => props.orderDelete(field)}>
                            <Close />
                        </div>
                    </div>
                ))}

                {Object.entries(props.filters).map(([key, el]: any) => (
                    <div key={key}>
                        <div>
                            <FilterList />
                        </div>
                        <div className="caption">{el.caption}</div>
                        <div className="value" dangerouslySetInnerHTML={{ __html: el.label }} />
                        <div className="remove" onClick={(e) => props.FilterDelete(key)}>
                            <Close />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
