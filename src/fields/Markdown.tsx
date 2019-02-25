import { IFieldProps } from "./Interfaces";
import * as React from "react";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import Stackedit from "stackedit-js";

import "./Markdown.sass";

import { createPortal } from "react-dom";
import { LoadingIndicator } from "../LoadingIndicator";
import { Modal } from "../Modal";

export const Markdown = (inProps: IFieldProps) => {
    const props: IFieldProps = { editable: true, style: {}, ...inProps };

    const iframeTarget = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
    }, [props.editable]);

    useMarkdown({ props, iframeTarget, setLoading });

    return (
        <div className="w-mardown">
            {loading && <LoadingIndicator text="Loading" />}

            {props.editable ? (
                <div className="w-markdown-editor">
                    <HelpBar />
                    <div
                        className="w-markdown-editor-container"
                        ref={iframeTarget}
                        style={{ display: loading ? "none" : "block", ...props.style }}
                    />
                </div>
            ) : (
                <IFrame
                    name="myIframeName"
                    style={{ display: loading ? "none" : "block", ...props.style }}
                  onLoad={function(ev) {
                        setLoading(false);
                        /*if (ev.target.contentDocument) {
                            //console.log(ev.target.window.innerWidth, "this");
                            console.log(window.frames.myIframeName)
                        }*/
                    }}
                >
                    <html>
                        <head>

                        </head>
                        <body
                            onLoad={function(el) {
                                console.log(window.frames.myIframeName, "frame");
                                /*                                console.log(window.frames.myIframeName.onload = function(){
                                                                    console.log("aaaa");
                                                                });
                                                                console.log(window.Prism, "prism");
                                                                console.log(el.nativeEvent);*/
                                //mermaid.initialize({ startOnLoad: true });
                            }}
                        >
                            <div>
                                <div ref={iframeTarget} />
                                <link rel="stylesheet" href="https://stackedit.io/style.css" />
                                <link
                                    rel="stylesheet"
                                    href="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/themes/prism.min.css"
                                />

                            </div>
                            <script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/prism.js" data-manual={"data-manual"} />
                            <script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/components/prism-json.min.js" />
                            <script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/components/prism-javascript.min.js" />
                            <script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/components/prism-php.min.js" />

                            <script src="https://unpkg.com/mermaid@8.0.0-rc.8/dist/mermaid.min.js" />

                        </body>
                    </html>
                </IFrame>
            )}
        </div>
    );
};

interface Pass {
    props: IFieldProps;
    iframeTarget: MutableRefObject<HTMLDivElement>;
    setLoading: (val: boolean) => any;
}

const useMarkdown = ({ props, iframeTarget, setLoading }: Pass) => {
    useEffect(() => {
        initEditor({ props, iframeTarget, setLoading });
    }, [props.editable]);
};

const initEditor = ({ props, iframeTarget, setLoading }: Pass) => {
    if (props.editable) {
        const stackedit = new Stackedit();
        stackedit.openFile({
            name: "Filename", // with a filename
            content: {
                text: props.value, // and the Markdown content.
            },
        });

        stackedit.on("fileChange", (file: any) => {
            if (props.onChange) {
                props.onChange({
                    value: file.content.text,
                    name: props.name,
                    type: "Markdown",
                    event: null,
                });
            }
        });

        const last = document.getElementsByClassName("stackedit-container").length - 1;

        const container: HTMLDivElement = document.getElementsByClassName("stackedit-container")[
            last
        ] as HTMLDivElement;
        if (container) {
            container.style.display = "none";

            setTimeout(() => {
                const stackeditIframe = document.getElementsByClassName("stackedit-iframe")[last] as HTMLIFrameElement;
                stackeditIframe.onload = () => {
                    setLoading(false);
                };
                iframeTarget.current.append(stackeditIframe);
                //stackeditIframe.style.height = iframeTarget.current.getBoundingClientRect().height + "px";
                container.remove();
            }, 20);
        }
    } else {
        import("markdown-it").then((el) => {
            const MarkdownIt = el.default;
            const md = new MarkdownIt();
            const content = md.render(props.value);
            iframeTarget.current.innerHTML = content;
        });
    }
};

const IFrame = ({ children, ...props }) => {
    const [contentRef, setContentRef] = useState(null);
    const mountNode = contentRef && contentRef.contentWindow.document.body;

    return (
        <iframe {...props} ref={setContentRef}>
            {mountNode && createPortal(React.Children.only(children), mountNode)}
        </iframe>
    );
};

const HelpBar = () => {
    const [helpVisible, setHelpVisible] = useState(false);

    return (
        <div className="w-mardown-toolbar">
            <a className="btn  btn-default" onClick={() => setHelpVisible(!helpVisible)}>
                Pomoc
            </a>

            <Modal show={helpVisible} onHide={() => setHelpVisible(false)} title="Pomoc" showHideLink={true}>
                <div dangerouslySetInnerHTML={{ __html: help }} style={{ margin: 0, padding: 15 }} />
            </Modal>
        </div>
    );
};

const help = `
<h4 style="margin: 0">Nagłówki</h4>
<pre>
# Header 1

## Header 2

### Header 3
</pre>


<h4 style="margin: 0">Style</h4>
<pre>
*Emphasize* _emphasize_

**Strong** __strong__

==Marked text.==

~~Mistaken text.~~

> Quoted text.

H~2~O is a liquid.

2^10^ is 1024.
</pre>


<h4 style="margin: 0">Listy</h4>
<pre>
- Item
  * Item
    + Item

1. Item 1
2. Item 2
3. Item 3

- [ ] Incomplete item
- [x] Complete item
</pre>


<h4 style="margin: 0">Linki</h4>
<pre>
A [link](http://example.com).

An image: ![Alt](img.jpg)

A sized image: ![Alt](img.jpg =60x50)
</pre>


<h4 style="margin: 0">Bloki</h4>
<pre>
Some \`inline code\`.

\`\`\`
// A code block
var foo = 'bar';
\`\`\`

\`\`\`javascript
// An highlighted block
var foo = 'bar';
\`\`\`
</pre>


<h4 style="margin: 0">Tabelki</h4>
<pre>

Item     | Value
-------- | -----
Computer | $1600
Phone    | $12
Pipe     | $1


| Column 1 | Column 2      |
|:--------:| -------------:|
| centered | right-aligned |
</pre>

<h4 style="margin: 0">Autorzy</h4>
<pre>
:  John
:  Luke
</pre>




<h4 style="margin: 0">Grafy</h4>
<pre>
\`\`\`\`mermaid
    graph LR
        Start -- To jest normalna droga --> Stop
        Stop --> XXXX
        Start -- Tu się dzieje coś dziwnego --> XXXX
        Start -- Nie wiem czemu to jest powtórzone? --> XXXX
    
        Magazyn -- Przekaz informacji --> Handlowiec
        Handlowiec -- Informacja --> Wysyłka
        Wysyłka -- Kartnony --> Siedziba
        Wysyłka -- Palety --> Panatoni
\`\`\`\`
</pre>
<a href="https://mermaidjs.github.io/" target="_blank">więcej</a>


<h4 style="margin: 0">Równania</h4>
<pre>
$$
\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.
$$
</pre>
<a href="https://mermaidjs.github.io/" target="_blank">https://en.wikibooks.org/wiki/LaTeX/Mathematics</a>

`;
