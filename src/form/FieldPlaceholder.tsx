import { withFormField } from "./WithFormField";
import * as React from "react";

export const FieldPlaceholder = withFormField((props) => <div>{props.children}</div>);
