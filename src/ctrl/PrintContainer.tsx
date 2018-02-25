import * as React from "react";
import * as ReactDOM from "react-dom";
import {Modal} from "frontend/src/ctrl/Overlays";
import {CommandBar} from "frontend/src/ctrl/CommandBar";


interface PrintContainerProps {
    title: string;
    onHide: { (): any }
    onPrint: { (): any }
}

export class PrintContainer extends React.Component<PrintContainerProps, any> {
    private iframe: HTMLIFrameElement;

    public static defaultProps: Partial<PrintContainerProps> = {
        title: __("Podgląd wydruku")
    }

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
        };
    }

    public print() {

    }

    handlePrint = () => {
        this.iframe.focus();
        this.iframe.contentWindow.print();
        if (this.props.onPrint) {
            this.props.onPrint();
        }
    }

    componentDidMount() {
        this.setState({ready: true});
    }

    public render() {
        return <div className={"w-print-container"}>

            <Modal
                show={true}
                title={this.props.title}
                showHideLink={true}
                onHide={this.props.onHide}
            >
                <div className="w-print-container-modal">
                    <CommandBar items={[
                        {key: "f1", label: "Drukuj", icon: "Print", onClick: this.handlePrint},
                        /*{key: "f1", label: "Pobierz jako PDF", icon: "PDF"}*/
                    ]}/>

                    <iframe ref={(el) => this.iframe = el}></iframe>
                    {this.state.ready && <MyWindowPortal iframe={this.iframe}>
                        {this.props.children}
                    </MyWindowPortal>}
                </div>
            </Modal>


        </div>;
    }
}

export const PrintPage = (props) => {
    return <div className={"w-print-page"}>{props.children}</div>
}

function copyStyles(sourceDoc, targetDoc) {
    Array.from(sourceDoc.styleSheets).forEach((styleSheet: any) => {
        if (styleSheet.cssRules) { // true for inline styles
            const newStyleEl = sourceDoc.createElement("style");

            Array.from(styleSheet.cssRules).forEach((cssRule: any) => {
                newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
            });

            targetDoc.head.appendChild(newStyleEl);
        } else if (styleSheet.href) { // true for stylesheets loaded from a URL
            const newLinkEl = sourceDoc.createElement("link");
            newLinkEl.rel = "stylesheet";
            newLinkEl.href = styleSheet.href;
            targetDoc.head.appendChild(newLinkEl);
        }
    });
}

class MyWindowPortal extends React.PureComponent<any, any> {
    private externalWindow: Window;
    private containerEl: HTMLDivElement;

    constructor(props) {
        super(props);

        this.containerEl = document.createElement("div"); // STEP 1: create an empty div
        this.externalWindow = null;
    }

    public componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    public componentDidMount() {
        var iframe = this.props.iframe;

        // STEP 3: open a new browser window and store a reference to it
        this.externalWindow = iframe.contentWindow;//window.open("", "", "width=600,height=400,left=200,top=200");

        // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
        this.externalWindow.document.body.appendChild(this.containerEl);
        //this.externalWindow.document.body.classList.add("w-print-page");

        this.externalWindow.document.title = "A React portal window";
        let style = this.externalWindow.document.createElement("style");
        style.appendChild(this.externalWindow.document.createTextNode("@page { size: auto;  margin: 0mm;  }"));
        this.externalWindow.document.head.appendChild(style);


        copyStyles(document, this.externalWindow.document);


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
