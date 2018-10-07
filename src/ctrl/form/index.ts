import { CheckboxGroup, ConnectionsField, Date, File, Select, Switch, Text, Textarea, Wysiwyg } from "../fields";
import { FileList } from "../fields/FileList/FileLists";

import { withFormField } from "./WithFormField";

export * from "./FieldPlaceholder";
export * from "./BForm";

export const BText = withFormField(Text);
export const BTextarea = withFormField(Textarea);
export const BSelect = withFormField(Select);
export const BSwitch = withFormField(Switch);
export const BCheckboxGroup = withFormField(CheckboxGroup);
export const BDate = withFormField(Date);
export const BFile = withFormField(File);
export const BWysiwig = withFormField(Wysiwyg);
export const BConnectionsField = withFormField(ConnectionsField);
export const BFileList = withFormField(FileList);

export { withFormField };
