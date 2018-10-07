import * as React from "react";
import * as ReactDOM from "react-dom";

type ICleanUpCallback = () => any;

interface IDownloaderProps {
    url: string;
    data?: any;
    cleanup: ICleanUpCallback;
}

class Downloader extends React.Component<IDownloaderProps> {
    public defaultProps: Partial<IDownloaderProps> = {
        data: {},
    };

    private form: HTMLFormElement;

    public download() {
        this.form.submit();
    }

    public componentDidMount() {
        this.download();
        setTimeout(() => this.props.cleanup(), 10);
    }

    public render() {
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

export const download = (url: string, data: any = {}): any => {
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
