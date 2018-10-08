import * as React from "react";
// var sourceMap = require('source-map');
// @ts-ignore
import { SourceMapConsumer } from "source-map/dist/source-map.min.js";
import { ideConnector } from "./IDEConnector";

export default class ErrorReporter extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            file: [],
            stacks: [],
        };
    }

    public componentDidMount() {
        const e = this.props.error;

        const stacks = parseError(e.stack);
        const protocol = "https";
        fetch(protocol + "://localhost:3000/bundle.js.map", {
            method: "get",
        }).then((response) => {
            response.text().then((rawSourceMapJsonData) => {
                const consumer = new SourceMapConsumer(rawSourceMapJsonData);
                stacks.forEach((stack: any) => {
                    this.state.stacks.push(
                        consumer.originalPositionFor({ line: stack.lineNumber, column: stack.columnNumber }),
                    );
                });

                fetch(protocol + "://localhost:3000/debug/getFile?file=" + this.state.stacks[0].source, {
                    method: "get",
                })
                    .then((response2: any) => {
                        response2.text().then((text: any) => {
                            const lines = text.split("\n");
                            const line = this.state.stacks[0].line;
                            const presented = [];
                            for (let i = line - 5; i <= line + 5; i++) {
                                presented.push({ line: i + 1, content: lines[i] });
                            }

                            this.setState({ file: presented });
                            this.forceUpdate();
                        });
                    })
                    .catch((err) => {
                        alert("Server get file error");
                    });
            });
        });

        return;
    }

    public render() {
        if (this.state.stacks.length == 0) {
            return <i className="fa fa-spinner fa-spin" />;
        }

        const e = this.props.error;
        const message = e.stack.split("\n")[0];

        const containerCss = { backgroundColor: "white", padding: 5, margin: 5, border: "solid 1px grey" };
        const messageCss = { color: "darkred", marginTop: 5 };
        const codeCss: any = {
            whiteSpace: "pre",
            backgroundColor: "#FDF3F4",
            color: "black",
            padding: 5,
            width: "100%",
            overflow: "auto",
        };

        const line = this.state.stacks[0].line;

        return (
            <div style={containerCss}>
                <h3 style={messageCss}>{message}</h3>
                {/*<h4 style={{color: 'black'}}>{currentMethod}()</h4>*/}
                <div style={codeCss}>
                    {this.state.file.map((el: any, index: any) => {
                        if (el.line == line) {
                            return (
                                <div style={{ backgroundColor: "#FCCFCF" }} key={index}>
                                    <div style={{ display: "inline-block", width: 30 }}>{el.line} |</div>
                                    {el.content}
                                </div>
                            );
                        } else {
                            return (
                                <div style={{ backgroundColor: "" }} key={index}>
                                    <div style={{ display: "inline-block", width: 30 }}>{el.line} |</div>
                                    {el.content}
                                </div>
                            );
                        }
                    })}
                </div>
                <h4>
                    <a onClick={() => ideConnector.openFile(this.state.stacks[0].source, this.state.stacks[0].line)}>
                        {this.state.stacks[0].source}:{this.state.stacks[0].line}
                    </a>
                </h4>
                {this.state.stacks.map((el: any, index: any) => (
                    <div key={index}>
                        <a style={{ color: "black" }} onClick={() => ideConnector.openFile(el.source, el.line)}>
                            {el.source}:{el.line}
                        </a>
                    </div>
                ))}
            </div>
        );
    }
}

const regexValidFrameChrome: RegExp = /^\s*(at|in)\s.+(:\d+)/;
const regexValidFrameFireFox: RegExp = /(^|@)\S+:\d+|.+line\s+\d+\s+>\s+(eval|Function).+/;

const regexExtractLocation = /\(?(.+?)(?::(\d+))?(?::(\d+))?\)?$/;

function extractLocation(token: any) {
    return regexExtractLocation
        .exec(token)
        .slice(1)
        .map((v) => {
            const p = Number(v);
            if (!isNaN(p)) {
                return p;
            }
            return v;
        });
}

function parseStack(stack: any) {
    const frames = stack
        .filter((e: any) => regexValidFrameChrome.test(e) || regexValidFrameFireFox.test(e))
        .map((e: any) => {
            if (regexValidFrameFireFox.test(e)) {
                // Strip eval, we don't care about it
                let isEval = false;
                if (/ > (eval|Function)/.test(e)) {
                    e = e.replace(/ line (\d+)(?: > eval line \d+)* > (eval|Function):\d+:\d+/g, ":$1");
                    isEval = true;
                }
                const data = e.split(/[@]/g);
                const last = data.pop();
                return new StackFrame(data.join("@") || (isEval ? "eval" : null), ...extractLocation(last));
            } else {
                // Strip eval, we don't care about it
                if (e.indexOf("(eval ") !== -1) {
                    e = e.replace(/(\(eval at [^()]*)|(\),.*$)/g, "");
                }
                if (e.indexOf("(at ") !== -1) {
                    e = e.replace(/\(at /, "(");
                }
                const data = e
                    .trim()
                    .split(/\s+/g)
                    .slice(1);
                const last = data.pop();
                return new StackFrame(data.join(" ") || null, ...extractLocation(last));
            }
        });
    return frames;
}

function parseError(error: any) {
    if (error == null) {
        throw new Error("You cannot pass a null object.");
    }
    if (typeof error === "string") {
        return parseStack(error.split("\n"));
    }
    if (Array.isArray(error)) {
        return parseStack(error);
    }
    if (typeof error.stack === "string") {
        return parseStack(error.stack.split("\n"));
    }
    throw new Error("The error you provided does not contain a stack trace.");
}

// noinspection TsLint
class ScriptLine {
    /** The line number of this line of source. */
    public lineNumber: any;
    /** The content (or value) of this line of source. */
    public content: any;
    /** Whether or not this line should be highlighted. Particularly useful for error reporting with context. */
    public highlight: any;

    constructor(lineNumber: any, content: any, highlight = false) {
        this.lineNumber = lineNumber;
        this.content = content;
        this.highlight = highlight;
    }
}

// noinspection TsLint
/**
 * A representation of a stack frame.
 */
class StackFrame {
    public functionName: any;
    public fileName: any;
    public lineNumber: any;
    public columnNumber: any;

    // noinspection TsLint
    public _originalFunctionName: any;
    // noinspection TsLint
    public _originalFileName: any;
    // noinspection TsLint
    public _originalLineNumber: any;
    // noinspection TsLint
    public _originalColumnNumber: any;
    // noinspection TsLint
    public _scriptCode: any;
    // noinspection TsLint
    public _originalScriptCode: any;

    constructor(
        functionName: any = null,
        fileName: any = null,
        lineNumber: any = null,
        columnNumber: any = null,
        scriptCode: any = null,
        sourceFunctionName: any = null,
        sourceFileName: any = null,
        sourceLineNumber: any = null,
        sourceColumnNumber: any = null,
        sourceScriptCode: any = null,
    ) {
        if (functionName && functionName.indexOf("Object.") === 0) {
            functionName = functionName.slice("Object.".length);
        }
        if (
            // Chrome has a bug with inferring function.name:
            // https://github.com/facebookincubator/create-react-app/issues/2097
            // Let's ignore a meaningless name we get for top-level modules.
            functionName === "friendlySyntaxErrorLabel" ||
            functionName === "exports.__esModule" ||
            functionName === "<anonymous>" ||
            !functionName
        ) {
            functionName = null;
        }
        this.functionName = functionName;

        this.fileName = fileName;
        this.lineNumber = lineNumber;
        this.columnNumber = columnNumber;

        this._originalFunctionName = sourceFunctionName;
        this._originalFileName = sourceFileName;
        this._originalLineNumber = sourceLineNumber;
        this._originalColumnNumber = sourceColumnNumber;

        this._scriptCode = scriptCode;
        this._originalScriptCode = sourceScriptCode;
    }

    /**
     * Returns the name of this function.
     */
    public getFunctionName() {
        return this.functionName || "(anonymous function)";
    }

    /**
     * Returns the source of the frame.
     * This contains the file name, line number, and column number when available.
     */
    public getSource() {
        let str = "";
        if (this.fileName != null) {
            str += this.fileName + ":";
        }
        if (this.lineNumber != null) {
            str += this.lineNumber + ":";
        }
        if (this.columnNumber != null) {
            str += this.columnNumber + ":";
        }
        return str.slice(0, -1);
    }

    /**
     * Returns a pretty version of this stack frame.
     */
    public toString() {
        const functionName = this.getFunctionName();
        const source = this.getSource();
        return `${functionName}${source ? ` (${source})` : ``}`;
    }
}
