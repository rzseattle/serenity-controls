import * as React from "react";
import { IFileViewerProps } from "../../fields/FileList/FileLists";
import { LoadingIndicator } from "../../common/LoadingIndicator";

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
        import("react-pdf").then((imported) => {
            this.Document = imported.Document;
            this.Page = imported.Page;
            this.setState({ viewerImported: true });
        });
    }

    public onDocumentLoadSuccess = ({ numPages }: any) => {
        this.setState({ numPages });
    };

    public render() {
        if (!this.state.viewerImported) {
            return <LoadingIndicator text={"Ładuje"} />;
        }
        return (
            <>
                <this.Document file={this.props.file.path} onLoadSuccess={this.onDocumentLoadSuccess}>
                    {this.state.numPages !== null &&
                        [...Array(this.state.numPages)].map((x, i) => (
                            <React.Fragment key={i}>
                                <this.Page pageNumber={i + 1} width={1000} />
                                <div style={{ height: 15, backgroundColor: "lightgrey" }} />
                            </React.Fragment>
                        ))}
                </this.Document>
            </>
        );
    }
}
