import * as React from "react";
import { IFileViewerProps } from "../FileListField";
import { LoadingIndicator } from "../LoadingIndicator";

interface IPDFViewerState {
    numPages: number;
    viewerImported: boolean;
}

export class PDFViewer extends React.Component<IFileViewerProps, IPDFViewerState> {
    public Document: any = null;
    public Page: any = null;
    constructor(props: IFileViewerProps) {
        super(props);

        this.state = {
            numPages: null,
            viewerImported: false,
        };
    }

    public componentDidMount(): void {
        // no typings
        // @ts-ignore
/*        import(/!* webpackChunkName: "pdfjs" *!/ "react-pdf").then((imported) => {
            this.Document = imported.Document;
            this.Page = imported.Page;
            this.setState({ viewerImported: true });
        });*/
    }

    public onDocumentLoadSuccess = ({ numPages }: any) => {
        this.setState({ numPages });
    };

    public render() {
        if (!this.state.viewerImported) {
            return <LoadingIndicator text={"Ładuje"} />;
        }
        return (
            <div style={{ maxWidth: "100%", maxHeight: "100%", overflow: "auto" }}>
                <this.Document file={this.props.file.path} onLoadSuccess={this.onDocumentLoadSuccess}>
                    {this.state.numPages !== null &&
                        [...Array(this.state.numPages)].map((x, i) => (
                            <React.Fragment key={i}>
                                {i + 1 > 1 && <div style={{ height: 15, backgroundColor: "lightgrey" }} />}
                                <this.Page pageNumber={i + 1} />
                            </React.Fragment>
                        ))}
                </this.Document>
            </div>
        );
    }
}
