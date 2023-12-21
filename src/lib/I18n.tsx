import langContainer from "./translation/LangContainer";

import { configGetAll } from "../backoffice/Config";

const config = configGetAll();

export const fI18n = { t: (val: string) => val };

export { langContainer };
