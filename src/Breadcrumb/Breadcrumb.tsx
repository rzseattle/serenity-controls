import * as React from "react";
import styles from "./Breadcrumb.module.sass";

export interface IBreadcrumbProps {
    children: React.ReactElement<typeof BreadcrumbItem>[] | React.ReactElement<typeof BreadcrumbItem>;
    toolbar?: any[];
}

export const Breadcrumb = (props: IBreadcrumbProps) => {
    const children = Array.isArray(props.children) ? props.children : [props.children];

    return (
        <div className={styles.main}>
            {children.filter(Boolean).map((child, key) => {
                const last = key + 1 == children.filter(Boolean).length;

                if (child !== null) {
                    return (
                        <React.Fragment key={key}>
                            <div className={styles.element}>{child}</div>
                            {!last && child !== null && <div className={styles.separator}>/</div>}
                        </React.Fragment>
                    );
                }
                return null;
            })}

            <div style={{ float: "right" }}>
                <div style={{ display: "table-cell", height: "50px", verticalAlign: "middle" }}>{props.toolbar}</div>
            </div>
        </div>
    );
};

export const BreadcrumbItem = ({ children, icon }: { children: React.ReactNode; icon?: React.ElementType }) => {
    const Icon = icon;
    return (
        <span>
            {icon && <Icon />} {children}
        </span>
    );
};
