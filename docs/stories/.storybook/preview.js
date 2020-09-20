import React from 'react';
import "../Stories.sass"
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}



export const decorators = [(Story) => <div style={{ margin: '2em' }}>

  <Story/><div id="modal-root"></div>
</div>];
