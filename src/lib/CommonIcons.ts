import { AiOutlineInfoCircle, AiOutlineMail, AiOutlineSearch } from "react-icons/ai";
import { BiCopy, BiExport, BiImport, BiPrinter, BiUpload } from "react-icons/bi";
import { BsCalendar, BsFilter, BsList } from "react-icons/bs";
import { FiArrowDown, FiArrowUp, FiDownload, FiLogOut } from "react-icons/fi";
import { HiOutlineDocumentText, HiOutlineFolder, HiOutlineSave } from "react-icons/hi";

import { MdDone, MdModeEdit, MdOpenInNew, MdRefresh } from "react-icons/md";
import { RiAddFill, RiDeleteBin4Line, RiHistoryFill, RiShoppingCartLine } from "react-icons/ri";
import {
    VscAccount,
    VscChevronDown,
    VscChevronLeft,
    VscChevronRight,
    VscChevronUp,
    VscChromeClose,
} from "react-icons/vsc";

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
