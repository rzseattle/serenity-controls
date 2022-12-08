// @ts-ignore
import { AiOutlineInfoCircle, AiOutlineMail, AiOutlineSearch } from "react-icons/index";
// @ts-ignore
import { BiCopy, BiExport, BiImport, BiPrinter, BiUpload } from "react-icons/index";
// @ts-ignore
import { BsCalendar, BsFilter, BsList } from "react-icons/index";
// @ts-ignore
import { FiArrowDown, FiArrowUp, FiDownload, FiLogOut } from "react-icons/index";
// @ts-ignore
import { HiOutlineDocumentText, HiOutlineFolder, HiOutlineSave } from "react-icons/index";
// @ts-ignore
import { MdDone, MdModeEdit, MdOpenInNew, MdRefresh } from "react-icons/index";
// @ts-ignore
import { RiAddFill, RiDeleteBin4Line, RiHistoryFill, RiShoppingCartLine } from "react-icons/index";
// @ts-ignore
import {
    // @ts-ignore
    VscAccount,
    // @ts-ignore
    VscChevronDown,
    // @ts-ignore
    VscChevronLeft,
    // @ts-ignore
    VscChevronRight,
    // @ts-ignore
    VscChevronUp,
    // @ts-ignore
    VscChromeClose,
} from "react-icons/index";

export const CommonIcons: Record<string, (props: any) => JSX.Element> = {
    edit: MdModeEdit,
    delete: RiDeleteBin4Line,
    add: RiAddFill,
    close: VscChromeClose,
    chevronDown: VscChevronDown,
    chevronUp: VscChevronUp,
    chevronLeft: VscChevronLeft,
    chevronRight: VscChevronRight,
    download: FiDownload,
    upload: BiUpload,
    import: BiImport,
    export: BiExport,

    print: BiPrinter,
    copy: BiCopy,
    openInNewWindow: MdOpenInNew,
    search: AiOutlineSearch,
    check: MdDone,
    up: FiArrowUp,
    down: FiArrowDown,
    filter: BsFilter,
    refresh: MdRefresh,
    mail: AiOutlineMail,
    folder: HiOutlineFolder,
    document: HiOutlineDocumentText,
    calendar: BsCalendar,

    back: VscChevronLeft,
    save: HiOutlineSave,
    list: BsList,
    cart: RiShoppingCartLine,
    info: AiOutlineInfoCircle,
    history: RiHistoryFill,

    user: VscAccount,
    exit: FiLogOut,
};

export const SpecialIcons = {};
