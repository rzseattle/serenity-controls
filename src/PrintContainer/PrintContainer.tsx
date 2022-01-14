import * as React from "react";
import * as ReactDOM from "react-dom";
import { CommandBar } from "../CommandBar";

import { IModalProps, Modal } from "../Modal";
import { fI18n } from "../lib";
import "./PrintContainer.sass";

import { CommonIcons } from "../lib/CommonIcons";

interface IPrintContainerProps {
    title?: string;
    onHide?: () => any;
    onPrint?: () => any;
    modalProps?: Partial<IModalProps>;
    printOnOpen?: boolean;
}

export class PrintContainer extends React.Component<IPrintContainerProps, any> {
    private iframe: HTMLIFrameElement;

    public static defaultProps = {
        modalProps: {},
    };

    constructor(props: IPrintContainerProps) {
        super(props);
        this.state = {
            ready: false,
        };
    }

    public handlePrint = () => {
        this.iframe.focus();
        this.iframe.contentWindow.print();
        if (this.props.title) {
            this.iframe.contentDocument.title = this.props.title;
        }
        if (this.props.onPrint) {
            this.props.onPrint();
        }
    };

    public componentDidMount() {
        setTimeout(() => {
            this.setState({ ready: true });
            if (this.props.printOnOpen) {
                this.handlePrint();
            }
        }, 200);
    }

    public render() {
        return (
            <div className={"w-print-container"}>
                <Modal
                    icon={CommonIcons.search}
                    show={true}
                    title={this.props.title ? this.props.title : fI18n.t("frontend:printContainer.printPreview")}
                    showHideLink={true}
                    onHide={this.props.onHide}
                    {...this.props.modalProps}
                >
                    <div className="w-print-container-modal">
                        <CommandBar
                            items={[
                                {
                                    key: "f1",
                                    label: fI18n.t("frontend:print"),
                                    icon: CommonIcons.print,
                                    onClick: this.handlePrint,
                                },
                                /*{key: "f1", label: "Pobierz jako PDF", icon: "PDF"}*/
                            ]}
                        />

                        <iframe ref={(el) => (this.iframe = el)} />
                        {this.state.ready && (
                            <MyWindowPortal iframe={this.iframe}>{this.props.children}</MyWindowPortal>
                        )}
                    </div>
                </Modal>
            </div>
        );
    }
}

export const PrintPage = (props: { children: any }) => {
    return <div className={"w-print-page"}>{props.children}</div>;
};

function copyStyles(sourceDoc: Document, targetDoc: Document) {
    try {
        Array.from(sourceDoc.styleSheets).forEach((styleSheet: any) => {
            if (styleSheet.cssRules) {
                // true for inline styles
                const newStyleEl = sourceDoc.createElement("style");

                Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
                    newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
                });

                targetDoc.head.appendChild(newStyleEl);
            } else if (styleSheet.href) {
                // true for stylesheets loaded from a URL
                const newLinkEl = sourceDoc.createElement("link");
                newLinkEl.rel = "stylesheet";
                newLinkEl.href = styleSheet.href;
                targetDoc.head.appendChild(newLinkEl);
            }
        });
    } catch (ex) {
        console.log("Not allowed to copy styles");
    }
}

class MyWindowPortal extends React.PureComponent<any, any> {
    private externalWindow: Window;
    private containerEl: HTMLDivElement;

    constructor(props: any) {
        super(props);

        this.containerEl = document.createElement("div"); // STEP 1: create an empty div
        this.externalWindow = null;
    }

    public componentDidMount() {
        const iframe = this.props.iframe;

        // STEP 3: open a new browser window and store a reference to it
        this.externalWindow = iframe.contentWindow; // window.open("", "", "width=600,height=400,left=200,top=200");

        // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
        this.externalWindow.document.body.appendChild(this.containerEl);
        // this.externalWindow.document.body.classList.add("w-print-page");

        this.externalWindow.document.title = "";
        this.externalWindow.document.getElementsByTagName("html")[0].setAttribute("moznomarginboxes", "1");
        this.externalWindow.document.getElementsByTagName("html")[0].setAttribute("mozdisallowselectionprint", "1");

        copyStyles(document, this.externalWindow.document);

        const style = this.externalWindow.document.createElement("style");
        style.appendChild(this.externalWindow.document.createTextNode("@page { size: auto;  margin: 0;  }\n"));
        style.appendChild(this.externalWindow.document.createTextNode("body>div { size: auto;  margin: 0mm;  }\n"));
        /*style.appendChild(
            this.externalWindow.document.createTextNode(
                "\n" +
                    "    @page :footer {\n" +
                    "        display: none\n" +
                    "    }\n" +
                    "\n" +
                    "    @page :header {\n" +
                    "        display: none\n" +
                    "    }\n" +
                    "\n",
            ),
        );*/

        this.externalWindow.document.head.appendChild(style);

        // update the state in the parent component if the user closes the
        // new window
        this.externalWindow.addEventListener("beforeunload", () => {
            this.props.closeWindowPortal();
        });
    }

    public componentWillUnmount() {
        // This will fire when this.state.showWindowPortal in the parent component becomes false
        // So we tidy up by just closing the window
        this.externalWindow.close();
    }

    public render() {
        // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
        return ReactDOM.createPortal(this.props.children, this.containerEl);
    }
}
