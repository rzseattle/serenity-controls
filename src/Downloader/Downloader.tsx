import * as React from "react";
import * as ReactDOM from "react-dom";

type ICleanUpCallback = () => any;

interface IDownloaderProps {
    url: string;
    data?: any;
    cleanup: ICleanUpCallback;
}

class Downloader extends React.PureComponent<IDownloaderProps> {
    public defaultProps: Partial<IDownloaderProps> = {
        data: null,
    };

    private form: HTMLFormElement;
    private a: HTMLAnchorElement;

    public download() {
        if (this.props.data == null) {
            this.a.click();
        } else {
            this.form.submit();
        }
    }

    public componentDidMount() {
        this.download();
        setTimeout(() => this.props.cleanup(), 10);
    }

    public render() {
        const { data } = this.props;
        if (data == null) {
            return (
                <a href={this.props.url} download={true} style={{ display: "none" }} ref={(el) => (this.a = el)}>
                    [[downloader]]
                </a>
            );
        }

        return (
            <form
                action={this.props.url}
                ref={(form) => (this.form = form)}
                style={{ display: "none" }}
                method="post"
                acceptCharset="UTF-8"
            >
                <textarea name="payload">{JSON.stringify(this.props.data)}</textarea>
            </form>
        );
    }
}

export const download = (url: string, data: any = null): any => {
    const parent = document.body;

    const wrapper = parent.appendChild(document.createElement("div"));
    const cleanup = () => {
        ReactDOM.unmountComponentAtNode(wrapper);
        wrapper.remove();
    };
    const props = {
        url,
        data,
    };

    const component = ReactDOM.render(<Downloader {...props} cleanup={cleanup} />, wrapper);
};
