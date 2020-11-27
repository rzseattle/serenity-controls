import React, { useState } from "react";
import { storiesOf } from "@storybook/react";

import { IOption, Select, Wysiwyg } from "../../../../src/fields";
import { Panel } from "../../../../src/Panel";
import { Markdown } from "../../../../src/fields/Markdown";

const str = `

\`\`\`javascript
<? $x = 1; ?>
\`\`\`

## Documentation

You can find the React documentation [on the website](https://reactjs.org/docs).  

Check out the [Getting Started](https://reactjs.org/docs/getting-started.html) page for a quick overview.

The documentation is divided into several sections:

* [Tutorial](https://reactjs.org/tutorial/tutorial.html)
* [Main Concepts](https://reactjs.org/docs/hello-world.html)
* [Advanced Guides](https://reactjs.org/docs/jsx-in-depth.html)
* [API Reference](https://reactjs.org/docs/react-api.html)
* [Where to Get Support](https://reactjs.org/community/support.html)
* [Contributing Guide](https://reactjs.org/docs/how-to-contribute.html)

You can improve it by sending pull requests to [this repository](https://github.com/reactjs/reactjs.org).

## Examples

We have several examples [on the website](https://reactjs.org/). Here is the first one to get you started:


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




`;

storiesOf("Form/Fields/Markdown ", module)
    .add("Base", () => {
        const Demo = () => {
            const [value, setValue] = useState(str);
            const [editable, setEditable] = useState(true);

            return (
                <Panel>
                    <div style={{ height: 800 }}>
                        <h4>Markdown editor not supporting external value change ( only init )</h4>
                        {/*<a onClick={() => setEditable(!editable)}>switch editable</a>*/}
                        <div style={{ height: 750 }}>
                            <Markdown value={str} onChange={(ev) => setValue(ev.value)} editable={editable} />
                        </div>
                    </div>
                </Panel>
            );
        };

        return <Demo />;
    })
    .add("Not editable", () => {
        const Demo = () => {
            const [value, setValue] = useState(str);

            return (
                <Panel>
                    <div style={{ height: 800 }}>
                        <Markdown value={str} onChange={(ev) => setValue(ev.value)} editable={false} />
                    </div>
                </Panel>
            );
        };
        return <Demo />;
    });
