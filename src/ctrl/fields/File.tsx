
interface IFileProps extends IFieldProps {
    value: FileList;
}

class File extends React.Component<IFileProps, any> {
    constructor(props) {
        super(props);
    }

    public handleFileAdd(e) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "file",
                value: e,
                event: e,
            });
        }
    }

    public render() {
        const props = this.props;
        return (
            <div className="w-file-upload">
                <Dropzone
                    style={{}}
                    className="w-file-dropzone"
                    activeClassName="w-gallery-add-active"
                    onDrop={this.handleFileAdd.bind(this)}
                >
                    <span>
                        <i className="fa fa-plus-circle" />
                        Kliknij lub przeciągnij tu plik
                    </span>
                </Dropzone>
                {props.value &&
                    Array.isArray(props.value) && (
                        <div className="w-file-dropzone-up-list">
                            {props.value.map((el) => (
                                <div>
                                    <div>
                                        <a href={el.preview || el.path} target="_blank">
                                            <div className="w-file-dropzone-up-list-icon">
                                                {el.type.indexOf("image") != -1 && (
                                                    <img src={el.preview || el.path} alt="" />
                                                )}
                                                {el.type.indexOf("image") == -1 && <i className="fa fa-file" />}
                                            </div>
                                            <div className="w-file-dropzone-up-list-name">{el.name}</div>
                                            <div className="w-file-dropzone-up-list-status">
                                                <i className={"fa fa-" + (el.preview ? "upload" : "check")} />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        );
    }
}