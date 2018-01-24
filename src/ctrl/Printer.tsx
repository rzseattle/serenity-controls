import * as React from "react";
import Icon from "./Icon"

interface IPrinterProps {

}


export default class Printer extends React.Component<IPrinterProps, any> {
    content: HTMLDivElement;
    iframe: HTMLIFrameElement;

    public static defaultProps: Partial<IPrinterProps> = {};


    print() {

        let pri = this.iframe.contentWindow;

        pri.document.open();
        pri.document.write(this.content.innerHTML);
        pri.document.close();
        this.copyStyles(window.document, pri.document);
        pri.focus();
        pri.print();
    }

    function

    copyStyles(sourceDoc: Document, targetDoc: Document) {
        Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
            if (styleSheet.href) { // for <link> elements loading CSS from a URL
                const newLinkEl = sourceDoc.createElement('link');

                newLinkEl.rel = 'stylesheet';
                newLinkEl.href = styleSheet.href;
                targetDoc.head.appendChild(newLinkEl);
                console.log("appending");
            }
        });
    }


    render() {
        return (
            <div className={"w-printer"}>
                <div ref={el => this.content = el}>
                    <div className={"w-printer-a4"}>
                        {this.props.children}
                    </div>
                </div>
{/*, position: "absolute"*/}
                <iframe ref={el => this.iframe = el} style={{height: 500, width: 500}}></iframe>
            </div>
        )
    }
}

export {Printer}
