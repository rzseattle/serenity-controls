import { IFieldProps } from "./Interfaces";
import * as React from "react";

import {  useRef, useState } from "react";
//import loadScript from "load-external-scripts";
import "./Markdown.sass";

import { Modal } from "../Modal";

import CodeMirror from "react-codemirror";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/markdown/markdown";

export const Markdown = (inProps: IFieldProps) => {
    const props: IFieldProps = { editable: true, style: {}, ...inProps };

    const iframeTarget = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(true);
    const [height, setHeight] = useState(0);

    // @ts-ignore
    return (
        <div className="w-mardown" style={{ height: height ? height : "auto" }}>
            {/*{loading && <LoadingIndicator text="Loading" />}*/}

            {props.editable ? (
                <div className="w-markdown-editor">
                    <HelpBar />

                    <CodeMirror
                        value={inProps.value}
                        options={{
                            mode: "markdown",
                            theme: "monokai",
                        }}
                        onChange={(value: any) => {
                            if (inProps.onChange) {
                                inProps.onChange({
                                    name: inProps.name,
                                    type: "markdown",
                                    value,
                                    event: null,
                                });
                            }
                        }}
                    />
                </div>
            ) : (
                <div>Not implemented</div>
                // @ts-ignore
            )}
        </div>
    );
};

const HelpBar = () => {
    const [helpVisible, setHelpVisible] = useState(false);

    return (
        <div className="w-mardown-toolbar" style={{ zIndex: 1000 }}>
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

{
    /* <IFrame
                    name="myIframeName"
                    style={{ display: loading ? "none" : "block", ...props.style }}
                    onLoad={(ev: any) => {
                        //setLoading(false);
                        if (ev.target.contentDocument) {
                            console.log("loaded");
                            //console.log(ev.nativeEvent.target.contentWindow.document);

                            //console.log(ev.target.window.innerWidth, "this");
                            //console.log(window.frames.myIframeName)
                            setLoading(false);
                            const win = ev.nativeEvent.target.contentWindow;
                            return true;
                            Promise.all([
                                loadScript({
                                    src: "//cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/prism.js",
                                    id: "id1",
                                }),
                            ]).then((result) => {
                                Promise.all([
                                    loadScript({
                                        src:
                                            "//cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-markup-templating.min.js",
                                        id: "id1",
                                    }),
                                    loadScript({
                                        src:
                                            "//cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-json.min.js",
                                        id: "id1",
                                    }),
                                    loadScript({
                                        src:
                                            "//cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-javascript.min.js",
                                        id: "id1",
                                    }),
                                    loadScript({
                                        src:
                                            "//cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-php.min.js",
                                        id: "id1",
                                    }),
                                    loadScript({
                                        src: "https://unpkg.com/mermaid@8.0.0-rc.8/dist/mermaid.min.js",
                                        id: "id1",
                                    }),
                                ]).then(() => {
                                    var mermaids = win.document.getElementsByClassName("language-mermaid");
                                    let i = 0;
                                    while (mermaids.length > 0) {
                                        i++;
                                        const el = mermaids[0];

                                        el.className = "mermaid";
                                        const id = "mermaid" + i;

                                        el.setAttribute("id", "mermaid" + i);
                                        // @ts-ignore
                                        mermaid.mermaidAPI.render(id, el.textContent, function(svgCode) {
                                            el.innerHTML = svgCode;
                                        });
                                    }

                                    // @ts-ignore
                                    //Prism.highlightAllUnder(win.document);
                                });
                            });
                        }

                        return true;
                    }}
                >
                    <>
                        <link rel="stylesheet" href="https://stackedit.io/style.css" />
                        <link
                            rel="stylesheet"
                            href="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/themes/prism.min.css"
                        />
                        <style
                            dangerouslySetInnerHTML={{
                                __html: `
                              h1 { margin: 5px 0 5px 0 !important;  }
                            `,
                            }}
                        />

                        <div>
                            <div ref={iframeTarget} />
                        </div>
                        <script dangerouslySetInnerHTML={{ __html: "alert('x');" }} />
                    </>
                </IFrame>*/
}
