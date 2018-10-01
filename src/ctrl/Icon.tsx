import * as React from "react";

interface IIconProps {
    name: string;
    size?: number;
}

const Icon: React.StatelessComponent<IIconProps> = (props) => {
    if (props.size != undefined) {
        let add: any = {};
        add = { style: { fontSize: props.size } };
        return <i className={"ms-Icon ms-Icon--" + props.name} {...add} aria-hidden="true" />;
    }
    return <i className={"ms-Icon ms-Icon--" + props.name} aria-hidden="true" />;
};

export default Icon;
export { Icon };

/*
 let icons = [
    "12PointStar",
    "6PointStar",
    "AADLogo",
    "Accept",
    "AccessLogo",
    "AccessLogoFill",
    "AccountManagement",
    "Accounts",
    "ActivateOrders",
    "ActivityFeed",
    "Add",
    "AddBookmark",
    "AddEvent",
    "AddFavorite",
    "AddFavoriteFill",
    "AddFriend",
    "AddGroup",
    "AddNotes",
    "AddOnlineMeeting",
    "AddPhone",
    "AddTo",
    "Admin",
    "AdminALogo32",
    "AdminALogoFill32",
    "AdminALogoInverse32",
    "AdminCLogoInverse32",
    "AdminDLogoInverse32",
    "AdminELogoInverse32",
    "AdminLLogoInverse32",
    "AdminMLogoInverse32",
    "AdminOLogoInverse32",
    "AdminPLogoInverse32",
    "AdminSLogoInverse32",
    "AdminYLogoInverse32",
    "Airplane",
    "AirplaneSolid",
    "AirTickets",
    "AlarmClock",
    "Album",
    "AlbumRemove",
    "AlertSolid",
    "AlignCenter",
    "AlignHorizontalCenter",
    "AlignHorizontalLeft",
    "AlignHorizontalRight",
    "AlignJustify",
    "AlignLeft",
    "AlignRight",
    "AlignVerticalBottom",
    "AlignVerticalCenter",
    "AlignVerticalTop",
    "AllApps",
    "AllAppsMirrored",
    "AnalyticsLogo",
    "AnalyticsQuery",
    "AnalyticsReport",
    "AnalyticsView",
    "AnchorLock",
    "Annotation",
    "AppIconDefault",
    "Archive",
    "AreaChart",
    "ArrangeBringForward",
    "ArrangeBringToFront",
    "ArrangeByFrom",
    "ArrangeSendBackward",
    "ArrangeSendToBack",
    "Arrivals",
    "ArrowDownRight8",
    "ArrowDownRightMirrored8",
    "ArrowTallDownLeft",
    "ArrowTallDownRight",
    "ArrowTallUpLeft",
    "ArrowTallUpRight",
    "ArrowUpRight",
    "ArrowUpRight8",
    "ArrowUpRightMirrored8",
    "Articles",
    "Ascending",
    "AspectRatio",
    "AssessmentGroup",
    "AssessmentGroupTemplate",
    "AssetLibrary",
    "Assign",
    "Asterisk",
    "AsteriskSolid",
    "ATPLogo",
    "Attach",
    "AustralianRules",
    "AutoEnhanceOff",
    "AutoEnhanceOn",
    "AutoFillTemplate",
    "AutoHeight",
    "AutoRacing",
    "AwayStatus",
    "AzureAPIManagement",
    "AzureKeyVault",
    "AzureLogo",
    "AzureServiceEndpoint",
    "Back",
    "BackgroundColor",
    "Backlog",
    "BacklogBoard",
    "BackToWindow",
    "Badge",
    "Balloons",
    "BankSolid",
    "BarChart4",
    "BarChartHorizontal",
    "BarChartVertical",
    "Baseball",
    "BeerMug",
    "BIDashboard",
    "BidiLtr",
    "BidiRtl",
    "BingLogo",
    "BirthdayCake",
    "BlockContact",
    "Blocked",
    "Blocked12",
    "Blocked2",
    "BlockedSite",
    "BlockedSolid",
    "BlowingSnow",
    "Blur",
    "Boards",
    "Bold",
    "BookingsLogo",
    "Bookmarks",
    "BookmarksMirrored",
    "BorderDash",
    "BorderDot",
    "BoxAdditionSolid",
    "BoxCheckmarkSolid",
    "BoxMultiplySolid",
    "BoxPlaySolid",
    "BoxSubtractSolid",
    "BranchCommit",
    "BranchCompare",
    "BranchFork",
    "BranchFork2",
    "BranchLocked",
    "BranchMerge",
    "BranchPullRequest",
    "BranchSearch",
    "BranchShelveset",
    "Breadcrumb",
    "Breakfast",
    "Brightness",
    "Broom",
    "BrowserScreenShot",
    "BrowserTab",
    "BrowserTabScreenshot",
    "Brunch",
    "BucketColor",
    "BucketColorFill",
    "BufferTimeAfter",
    "BufferTimeBefore",
    "BufferTimeBoth",
    "Bug",
    "BugSolid",
    "Build",
    "BuildIssue",
    "BuildQueue",
    "BuildQueueNew",
    "BulkUpload",
    "BulletedList",
    "BulletedList2",
    "BulletedList2Mirrored",
    "BulletedListMirrored",
    "Bullseye",
    "Bus",
    "BusinessCenterLogo",
    "BusinessHoursSign",
    "BusSolid",
    "Cafe",
    "Cake",
    "Calculator",
    "CalculatorAddition",
    "CalculatorEqualTo",
    "CalculatorMultiply",
    "CalculatorNotEqualTo",
    "CalculatorSubtract",
    "Calendar",
    "CalendarAgenda",
    "CalendarDay",
    "CalendarMirrored",
    "CalendarReply",
    "CalendarSettings",
    "CalendarSettingsMirrored",
    "CalendarWeek",
    "CalendarWorkWeek",
    "CaloriesAdd",
    "Camera",
    "Cancel",
    "CannedChat",
    "Car",
    "CaretBottomLeftCenter8",
    "CaretBottomLeftSolid8",
    "CaretBottomRightCenter8",
    "CaretBottomRightSolid8",
    "CaretDown8",
    "CaretDownSolid8",
    "CaretHollow",
    "CaretHollowMirrored",
    "CaretLeft8",
    "CaretLeftSolid8",
    "CaretRight",
    "CaretRight8",
    "CaretRightSolid8",
    "CaretSolid",
    "CaretSolid16",
    "CaretSolidDown",
    "CaretSolidLeft",
    "CaretSolidMirrored",
    "CaretSolidRight",
    "CaretSolidUp",
    "CaretTopLeftCenter8",
    "CaretTopLeftSolid8",
    "CaretTopRightCenter8",
    "CaretTopRightSolid8",
    "CaretUp8",
    "CaretUpSolid8",
    "Cat",
    "CellPhone",
    "Certificate",
    "CertifiedDatabase",
    "Chart",
    "ChartSeries",
    "ChartXAngle",
    "ChartYAngle",
    "Chat",
    "ChatInviteFriend",
    "ChatSolid",
    "Checkbox",
    "CheckboxComposite",
    "CheckboxCompositeReversed",
    "CheckboxIndeterminate",
    "CheckedOutByOther12",
    "CheckedOutByYou12",
    "CheckList",
    "CheckMark",
    "ChevronDown",
    "ChevronDownEnd6",
    "ChevronDownMed",
    "ChevronDownSmall",
    "ChevronFold10",
    "ChevronLeft",
    "ChevronLeftEnd6",
    "ChevronLeftMed",
    "ChevronLeftSmall",
    "ChevronRight",
    "ChevronRightEnd6",
    "ChevronRightMed",
    "ChevronRightSmall",
    "ChevronUnfold10",
    "ChevronUp",
    "ChevronUpEnd6",
    "ChevronUpMed",
    "ChevronUpSmall",
    "Chopsticks",
    "ChromeBack",
    "ChromeBackMirrored",
    "ChromeClose",
    "ChromeMinimize",
    "CircleAddition",
    "CircleAdditionSolid",
    "CircleFill",
    "CircleHalfFull",
    "CirclePause",
    "CirclePauseSolid",
    "CirclePlus",
    "CircleRing",
    "CircleShapeSolid",
    "CircleStop",
    "CircleStopSolid",
    "CityNext",
    "ClassNotebookLogo16",
    "ClassNotebookLogo32",
    "ClassNotebookLogoFill16",
    "ClassNotebookLogoFill32",
    "ClassNotebookLogoInverse",
    "ClassNotebookLogoInverse16",
    "ClassNotebookLogoInverse32",
    "ClassroomLogo",
    "Clear",
    "ClearFilter",
    "ClearFormatting",
    "ClearNight",
    "ClipboardSolid",
    "Clock",
    "CloneToDesktop",
    "ClosedCaption",
    "ClosePane",
    "ClosePaneMirrored",
    "Cloud",
    "CloudAdd",
    "CloudDownload",
    "CloudUpload",
    "CloudWeather",
    "Cloudy",
    "Cocktails",
    "Code",
    "CodeEdit",
    "Coffee",
    "CoffeeScript",
    "CollapseContent",
    "CollapseContentSingle",
    "CollapseMenu",
    "CollegeFootball",
    "CollegeHoops",
    "Color",
    "ColorSolid",
    "ColumnLeftTwoThirds",
    "ColumnLeftTwoThirdsEdit",
    "ColumnOptions",
    "ColumnRightTwoThirds",
    "ColumnRightTwoThirdsEdit",
    "Combine",
    "Combobox",
    "CommandPrompt",
    "Comment",
    "CommentAdd",
    "CommentNext",
    "CommentPrevious",
    "CommentUrgent",
    "Commitments",
    "Communications",
    "CompanyDirectory",
    "CompanyDirectoryMirrored",
    "CompassNW",
    "Completed",
    "CompletedSolid",
    "ConfigurationSolid",
    "ConnectContacts",
    "ConstructionCone",
    "ConstructionConeSolid",
    "Contact",
    "ContactCard",
    "ContactCardSettings",
    "ContactCardSettingsMirrored",
    "ContactInfo",
    "ContactLink",
    "ContextMenu",
    "Contrast",
    "Copy",
    "Cotton",
    "CPlusPlus",
    "CPlusPlusLanguage",
    "CreateMailRule",
    "Cricket",
    "CRMReport",
    "Crop",
    "Crown",
    "CrownSolid",
    "CSharp",
    "CSharpLanguage",
    "CSS",
    "CustomList",
    "CustomListMirrored",
    "Cut",
    "Cycling",
    "DashboardAdd",
    "Database",
    "DataConnectionLibrary",
    "DateTime",
    "DateTime2",
    "DateTimeMirrored",
    "DeactivateOrders",
    "DecisionSolid",
    "DeclineCall",
    "DecreaseIndentLegacy",
    "DefaultRatio",
    "DefectSolid",
    "Delete",
    "DeleteColumns",
    "DeleteRows",
    "DeleteRowsMirrored",
    "DeleteTable",
    "DeliveryTruck",
    "DelveAnalytics",
    "DelveAnalyticsLogo",
    "DelveLogo",
    "DelveLogoFill",
    "DelveLogoInverse",
    "Deploy",
    "Descending",
    "Design",
    "DesktopScreenshot",
    "DeveloperTools",
    "Devices3",
    "Devices4",
    "Diagnostic",
    "Dialpad",
    "DiamondSolid",
    "Dictionary",
    "DictionaryRemove",
    "DietPlanNotebook",
    "DiffInline",
    "DiffSideBySide",
    "DisableUpdates",
    "Dislike",
    "DislikeSolid",
    "DockLeft",
    "DockLeftMirrored",
    "DockRight",
    "DocLibrary",
    "DocsLogoInverse",
    "Document",
    "DocumentApproval",
    "Documentation",
    "DocumentManagement",
    "DocumentReply",
    "DocumentSearch",
    "DocumentSet",
    "DOM",
    "DonutChart",
    "Door",
    "DoubleBookmark",
    "DoubleChevronDown",
    "DoubleChevronDown12",
    "DoubleChevronDown8",
    "DoubleChevronLeft",
    "DoubleChevronLeft12",
    "DoubleChevronLeft8",
    "DoubleChevronLeftMed",
    "DoubleChevronLeftMedMirrored",
    "DoubleChevronRight",
    "DoubleChevronRight12",
    "DoubleChevronRight8",
    "DoubleChevronUp",
    "DoubleChevronUp12",
    "DoubleChevronUp8",
    "DoubleColumn",
    "DoubleColumnEdit",
    "Down",
    "Download",
    "DownloadDocument",
    "DragObject",
    "DrillDown",
    "DrillDownSolid",
    "DrillExpand",
    "DrillShow",
    "DrillThrough",
    "DRM",
    "Drop",
    "Dropdown",
    "DropShapeSolid",
    "Duststorm",
    "Dynamics365Logo",
    "DynamicSMBLogo",
    "EatDrink",
    "EdgeLogo",
    "Edit",
    "EditContact",
    "EditMail",
    "EditMirrored",
    "EditNote",
    "EditPhoto",
    "EditSolid12",
    "EditSolidMirrored12",
    "EditStyle",
    "Education",
    "Ellipse",
    "Embed",
    "EMI",
    "Emoji",
    "Emoji2",
    "EmojiDisappointed",
    "EmojiNeutral",
    "EmojiTabSymbols",
    "EmptyRecycleBin",
    "Encryption",
    "EngineeringGroup",
    "EntryDecline",
    "EntryView",
    "Equalizer",
    "EraseTool",
    "Error",
    "ErrorBadge",
    "Event",
    "EventAccepted",
    "EventDate",
    "EventDeclined",
    "EventInfo",
    "EventTentative",
    "EventTentativeMirrored",
    "ExcelDocument",
    "ExcelLogo",
    "ExcelLogo16",
    "ExcelLogoFill",
    "ExcelLogoFill16",
    "ExcelLogoInverse",
    "ExcelLogoInverse16",
    "ExchangeLogo",
    "ExchangeLogoFill",
    "ExchangeLogoInverse",
    "ExerciseTracker",
    "ExpandMenu",
    "ExploreContent",
    "ExploreContentSingle",
    "ExploreData",
    "Export",
    "ExportMirrored",
    "ExternalBuild",
    "ExternalGit",
    "ExternalTFVC",
    "ExternalXAML",
    "F12DevTools",
    "FabricAssetLibrary",
    "FabricDataConnectionLibrary",
    "FabricDocLibrary",
    "FabricFolder",
    "FabricFolderFill",
    "FabricFolderSearch",
    "FabricFormLibrary",
    "FabricFormLibraryMirrored",
    "FabricMovetoFolder",
    "FabricNewFolder",
    "FabricOpenFolderHorizontal",
    "FabricPictureLibrary",
    "FabricPublicFolder",
    "FabricReportLibrary",
    "FabricReportLibraryMirrored",
    "FabricSyncFolder",
    "FabricUnsyncFolder",
    "Family",
    "FangBody",
    "FastForward",
    "FastMode",
    "Favicon",
    "FavoriteList",
    "FavoriteStar",
    "FavoriteStarFill",
    "Fax",
    "Feedback",
    "FeedbackRequestMirroredSolid",
    "FeedbackRequestSolid",
    "FeedbackResponseSolid",
    "Ferry",
    "FerrySolid",
    "FieldChanged",
    "FieldEmpty",
    "FieldFilled",
    "FieldNotChanged",
    "FieldReadOnly",
    "FieldRequired",
    "FileASPX",
    "FileBug",
    "FileCode",
    "FileComment",
    "FileCSS",
    "FileHTML",
    "FileImage",
    "FileJAVA",
    "FileLess",
    "FilePDB",
    "FileSass",
    "FileSQL",
    "FileSymlink",
    "FileTemplate",
    "FileTypeSolution",
    "FileYML",
    "Filter",
    "Filters",
    "FilterSolid",
    "FiltersSolid",
    "Financial",
    "FinancialMirroredSolid",
    "FinancialSolid",
    "Fingerprint",
    "FiveTileGrid",
    "Flag",
    "FlameSolid",
    "FlickDown",
    "FlickLeft",
    "FlickRight",
    "FlickUp",
    "Flow",
    "FocalPoint",
    "Fog",
    "Folder",
    "FolderFill",
    "FolderHorizontal",
    "FolderList",
    "FolderListMirrored",
    "FolderOpen",
    "FolderQuery",
    "FolderSearch",
    "FollowUser",
    "Font",
    "FontColor",
    "FontColorA",
    "FontColorSwatch",
    "FontDecrease",
    "FontIncrease",
    "FontSize",
    "FormLibrary",
    "FormLibraryMirrored",
    "Forward",
    "ForwardEvent",
    "Freezing",
    "Frigid",
    "FSharp",
    "FSharpLanguage",
    "FullCircleMask",
    "FullHistory",
    "FullScreen",
    "FullWidth",
    "FullWidthEdit",
    "FunctionalManagerDashboard",
    "GallatinLogo",
    "Generate",
    "GenericScan",
    "Giftbox",
    "GiftboxOpen",
    "GiftBoxSolid",
    "GiftCard",
    "GitFork",
    "GitGraph",
    "Glasses",
    "Glimmer",
    "GlobalNavButton",
    "Globe",
    "Globe2",
    "GlobeFavorite",
    "Golf",
    "GotoToday",
    "GridViewLarge",
    "GridViewMedium",
    "GridViewSmall",
    "GripperBarHorizontal",
    "GripperBarVertical",
    "GripperTool",
    "Group",
    "GroupedAscending",
    "GroupedDescending",
    "GroupedList",
    "GroupObject",
    "GUID",
    "Guitar",
    "HailDay",
    "HailNight",
    "HalfAlpha",
    "HalfCircle",
    "HandsFree",
    "Handwriting",
    "HardDrive",
    "HardDriveGroup",
    "HardDriveLock",
    "HardDriveUnlock",
    "Header1",
    "Header2",
    "Header3",
    "Header4",
    "Headset",
    "HeadsetSolid",
    "Health",
    "HealthSolid",
    "Heart",
    "HeartBroken",
    "HeartFill",
    "Help",
    "HelpMirrored",
    "Hexagon",
    "Hide",
    "Hide2",
    "Highlight",
    "HighlightMappedShapes",
    "HintText",
    "History",
    "Home",
    "HomeSolid",
    "HorizontalDistributeCenter",
    "Hospital",
    "Hotel",
    "HourGlass",
    "IconSetsFlag",
    "IDBadge",
    "ImageCrosshair",
    "ImageDiff",
    "ImagePixel",
    "ImageSearch",
    "Import",
    "Important",
    "ImportMirrored",
    "Inbox",
    "InboxCheck",
    "IncidentTriangle",
    "IncreaseIndentLegacy",
    "Info",
    "Info2",
    "InfoSolid",
    "InsertColumnsLeft",
    "InsertColumnsRight",
    "InsertRowsAbove",
    "InsertRowsBelow",
    "InsertSignatureLine",
    "InsertTextBox",
    "InstallToDrive",
    "InternetSharing",
    "IRMForward",
    "IRMForwardMirrored",
    "IRMReply",
    "IRMReplyMirrored",
    "IssueSolid",
    "IssueTracking",
    "IssueTrackingMirrored",
    "Italic",
    "JavaScriptLanguage",
    "JoinOnlineMeeting",
    "JS",
    "KaizalaLogo",
    "Label",
    "LadybugSolid",
    "Lamp",
    "LandscapeOrientation",
    "LaptopSecure",
    "LaptopSelected",
    "LargeGrid",
    "Leave",
    "Library",
    "Lifesaver",
    "LifesaverLock",
    "Light",
    "Lightbulb",
    "LightningBolt",
    "LightWeight",
    "Like",
    "LikeSolid",
    "Line",
    "LineChart",
    "LineSpacing",
    "LineStyle",
    "LineThickness",
    "Link",
    "LinkedInLogo",
    "List",
    "ListMirrored",
    "LocaleLanguage",
    "Location",
    "LocationCircle",
    "LocationDot",
    "LocationFill",
    "LocationOutline",
    "Lock",
    "LockSolid",
    "LogRemove",
    "LookupEntities",
    "LowerBrightness",
    "LyncLogo",
    "Mail",
    "MailAlert",
    "MailCheck",
    "MailFill",
    "MailForward",
    "MailForwardMirrored",
    "MailLowImportance",
    "MailPause",
    "MailReminder",
    "MailRepeat",
    "MailReply",
    "MailReplyAll",
    "MailReplyAllMirrored",
    "MailReplyMirrored",
    "MailSolid",
    "MailTentative",
    "MailTentativeMirrored",
    "MailUndelivered",
    "ManagerSelfService",
    "MapDirections",
    "MapPin",
    "MapPinSolid",
    "MarkDownLanguage",
    "Market",
    "MarketDown",
    "MasterDatabase",
    "MaximumValue",
    "Medal",
    "MediaAdd",
    "Medical",
    "Megaphone",
    "MegaphoneSolid",
    "Memo",
    "Merge",
    "MergeDuplicate",
    "Message",
    "MessageFill",
    "MicOff",
    "Microphone",
    "MicrosoftFlowLogo",
    "MicrosoftStaffhubLogo",
    "MiniContract",
    "MiniExpand",
    "MiniLink",
    "MinimumValue",
    "MobileReport",
    "MobileSelected",
    "Money",
    "More",
    "MoreSports",
    "MoreVertical",
    "Move",
    "Movers",
    "MoveToFolder",
    "MSNLogo",
    "MSNVideos",
    "MSNVideosSolid",
    "MTMLogo",
    "MultiSelect",
    "MultiSelectMirrored",
    "MusicInCollection",
    "MusicInCollectionFill",
    "MusicNote",
    "MyMoviesTV",
    "Nav2DMapView",
    "NavigateBack",
    "NavigateBackMirrored",
    "NavigateExternalInline",
    "NavigateForward",
    "NavigateForwardMirrored",
    "NavigationFlipper",
    "NetworkTower",
    "NewAnalyticsQuery",
    "NewFolder",
    "News",
    "NewsSearch",
    "NewTeamProject",
    "Next",
    "NonprofitLogo32",
    "NormalWeight",
    "NoteForward",
    "NotePinned",
    "NoteReply",
    "NotExecuted",
    "NotImpactedSolid",
    "NugetLogo",
    "NumberedList",
    "NumberField",
    "NumberSequence",
    "Octagon",
    "OEM",
    "OfficeAddinsLogo",
    "OfficeAssistantLogo",
    "OfficeFormsLogo",
    "OfficeFormsLogo16",
    "OfficeFormsLogo24",
    "OfficeFormsLogoFill",
    "OfficeFormsLogoFill16",
    "OfficeFormsLogoFill24",
    "OfficeFormsLogoInverse",
    "OfficeFormsLogoInverse16",
    "OfficeFormsLogoInverse24",
    "OfficeLogo",
    "OfficeStoreLogo",
    "OfficeVideoLogo",
    "OfficeVideoLogoFill",
    "OfficeVideoLogoInverse",
    "OfflineOneDriveParachute",
    "OfflineOneDriveParachuteDisabled",
    "OfflineStorageSolid",
    "OneDrive",
    "OneDriveAdd",
    "OneDriveFolder16",
    "OneNoteEduLogoInverse",
    "OneNoteLogo",
    "OneNoteLogo16",
    "OneNoteLogoFill",
    "OneNoteLogoFill16",
    "OneNoteLogoInverse",
    "OneNoteLogoInverse16",
    "OpenFile",
    "OpenFolderHorizontal",
    "OpenInNewWindow",
    "OpenPane",
    "OpenPaneMirrored",
    "OpenSource",
    "Org",
    "Orientation",
    "OutlookLogo",
    "OutlookLogo16",
    "OutlookLogoFill",
    "OutlookLogoFill16",
    "OutlookLogoInverse",
    "OutlookLogoInverse16",
    "OutOfOffice",
    "Package",
    "Packages",
    "Padding",
    "PaddingBottom",
    "PaddingLeft",
    "PaddingRight",
    "PaddingTop",
    "Page",
    "PageAdd",
    "PageCheckedin",
    "PageCheckedOut",
    "PageEdit",
    "PageLeft",
    "PageListMirroredSolid",
    "PageListSolid",
    "PageLock",
    "PageRemove",
    "PageRight",
    "PageSolid",
    "PanoIndicator",
    "Parachute",
    "ParachuteSolid",
    "Parameter",
    "ParkingLocation",
    "ParkingLocationMirrored",
    "ParkingMirroredSolid",
    "ParkingSolid",
    "PartlyCloudyDay",
    "PartlyCloudyNight",
    "PartyLeader",
    "Paste",
    "PasteAsCode",
    "PasteAsText",
    "Pause",
    "PaymentCard",
    "PC1",
    "PDF",
    "PencilReply",
    "Pentagon",
    "People",
    "PeopleAdd",
    "PeopleAlert",
    "PeopleBlock",
    "PeoplePause",
    "PeopleRepeat",
    "Permissions",
    "PermissionsSolid",
    "Personalize",
    "Phishing",
    "Phone",
    "Photo2",
    "Photo2Add",
    "Photo2Remove",
    "PhotoCollection",
    "Picture",
    "PictureCenter",
    "PictureFill",
    "PictureLibrary",
    "PicturePosition",
    "PictureStretch",
    "PictureTile",
    "PieDouble",
    "PieSingle",
    "PieSingleSolid",
    "Pill",
    "Pin",
    "Pinned",
    "PinnedFill",
    "PivotChart",
    "PlannerLogo",
    "PlanView",
    "Play",
    "PlayerSettings",
    "PlayResume",
    "Plug",
    "PlugConnected",
    "PlugDisconnected",
    "PlugSolid",
    "POI",
    "POISolid",
    "PostUpdate",
    "PowerApps",
    "PowerApps2Logo",
    "PowerAppsLogo",
    "PowerBILogo",
    "PowerButton",
    "PowerPointDocument",
    "PowerPointLogo",
    "PowerPointLogo16",
    "PowerPointLogoFill",
    "PowerPointLogoFill16",
    "PowerPointLogoInverse",
    "PowerPointLogoInverse16",
    "Precipitation",
    "PresenceChickletVideo",
    "Preview",
    "PreviewLink",
    "Previous",
    "PrimaryCalendar",
    "Print",
    "PrintfaxPrinterFile",
    "Processing",
    "ProcessMetaTask",
    "Product",
    "ProfileSearch",
    "ProFootball",
    "ProgressLoopInner",
    "ProgressLoopOuter",
    "ProgressRingDots",
    "ProHockey",
    "ProjectCollection",
    "ProjectLogo16",
    "ProjectLogo32",
    "ProjectLogoFill16",
    "ProjectLogoFill32",
    "ProjectLogoInverse",
    "ProtectedDocument",
    "ProtectionCenterLogo32",
    "ProtectRestrict",
    "PublicCalendar",
    "PublicContactCard",
    "PublicContactCardMirrored",
    "PublicEmail",
    "PublicFolder",
    "PublishCourse",
    "PublisherLogo",
    "PublisherLogo16",
    "PublisherLogoFill",
    "PublisherLogoFill16",
    "PublisherLogoInverse16",
    "Puzzle",
    "PY",
    "PythonLanguage",
    "QuarterCircle",
    "QueryList",
    "Questionnaire",
    "QuestionnaireMirrored",
    "QuickNote",
    "QuickNoteSolid",
    "R",
    "RadioBtnOff",
    "RadioBtnOn",
    "RadioBullet",
    "Rain",
    "RainShowersDay",
    "RainShowersNight",
    "RainSnow",
    "RawSource",
    "Read",
    "ReadingMode",
    "ReadingModeSolid",
    "ReadOutLoud",
    "ReceiptCheck",
    "ReceiptForward",
    "ReceiptReply",
    "ReceiptTentative",
    "ReceiptTentativeMirrored",
    "ReceiptUndelivered",
    "Recent",
    "Record2",
    "RectangleShapeSolid",
    "RectangularClipping",
    "RecurringEvent",
    "RecurringTask",
    "RecycleBin",
    "Redeploy",
    "RedEye",
    "Redo",
    "Refresh",
    "ReminderGroup",
    "ReminderPerson",
    "Remote",
    "Remove",
    "RemoveEvent",
    "RemoveFilter",
    "RemoveLink",
    "RemoveOccurrence",
    "Rename",
    "RenewalCurrent",
    "RenewalFuture",
    "ReopenPages",
    "Repair",
    "Reply",
    "ReplyAll",
    "ReplyAllAlt",
    "ReplyAllMirrored",
    "ReplyAlt",
    "ReplyMirrored",
    "Repo",
    "ReportAdd",
    "ReportHacked",
    "ReportLibrary",
    "ReportLibraryMirrored",
    "RepoSolid",
    "ReturnToSession",
    "ReviewRequestMirroredSolid",
    "ReviewRequestSolid",
    "ReviewResponseSolid",
    "ReviewSolid",
    "RevToggleKey",
    "Rewind",
    "Ribbon",
    "RibbonSolid",
    "RightDoubleQuote",
    "RightTriangle",
    "Ringer",
    "RingerOff",
    "RingerRemove",
    "Robot",
    "Rocket",
    "Room",
    "Rotate",
    "RowsChild",
    "RowsGroup",
    "Rugby",
    "Running",
    "Sad",
    "SadSolid",
    "Save",
    "SaveAll",
    "SaveAndClose",
    "SaveAs",
    "Savings",
    "ScaleUp",
    "ScheduleEventAction",
    "ScopeTemplate",
    "Script",
    "ScrollUpDown",
    "Search",
    "SearchAndApps",
    "SearchBookmark",
    "SearchCalendar",
    "SearchIssue",
    "SearchIssueMirrored",
    "Section",
    "Sections",
    "SecurityGroup",
    "SelectAll",
    "Sell",
    "SemiboldWeight",
    "Send",
    "SendMirrored",
    "Separator",
    "Server",
    "ServerEnviroment",
    "ServerProcesses",
    "SetAction",
    "Settings",
    "Share",
    "ShareiOS",
    "SharepointLogo",
    "SharepointLogoFill",
    "SharepointLogoInverse",
    "Shield",
    "ShieldSolid",
    "Shop",
    "ShoppingCart",
    "ShoppingCartSolid",
    "ShopServer",
    "ShowResults",
    "ShowResultsMirrored",
    "SidePanel",
    "SidePanelMirrored",
    "SignOut",
    "SingleBookmark",
    "SingleBookmarkSolid",
    "SingleColumn",
    "SingleColumnEdit",
    "SIPMove",
    "SiteScan",
    "SizeLegacy",
    "SkiResorts",
    "SkypeCheck",
    "SkypeCircleCheck",
    "SkypeCircleClock",
    "SkypeCircleMinus",
    "SkypeClock",
    "SkypeForBusinessLogo",
    "SkypeForBusinessLogo16",
    "SkypeForBusinessLogoFill",
    "SkypeForBusinessLogoFill16",
    "SkypeLogo",
    "SkypeLogo16",
    "SkypeMessage",
    "SkypeMinus",
    "Slider",
    "SliderHandleSize",
    "SliderThumb",
    "Snooze",
    "Snow",
    "Snowflake",
    "SnowShowerDay",
    "SnowShowerNight",
    "Soccer",
    "SocialListeningLogo",
    "Sort",
    "SortDown",
    "SortLines",
    "SortUp",
    "Source",
    "Spacer",
    "Speakers",
    "SpeedHigh",
    "Split",
    "SplitObject",
    "Sprint",
    "Squalls",
    "SquareShapeSolid",
    "Stack",
    "StackedBarChart",
    "StackedLineChart",
    "StackIndicator",
    "StaffNotebookLogo16",
    "StaffNotebookLogo32",
    "StaffNotebookLogoFill16",
    "StaffNotebookLogoFill32",
    "StaffNotebookLogoInverted16",
    "StaffNotebookLogoInverted32",
    "Starburst",
    "StarburstSolid",
    "StatusCircleBlock2",
    "StatusCircleCheckmark",
    "StatusCircleErrorX",
    "StatusCircleExclamation",
    "StatusCircleInfo",
    "StatusCircleInner",
    "StatusCircleOuter",
    "StatusCircleQuestionMark",
    "StatusCircleRing",
    "StatusErrorFull",
    "StatusTriangle",
    "StatusTriangleExclamation",
    "StatusTriangleInner",
    "StatusTriangleOuter",
    "Step",
    "StepInsert",
    "StepShared",
    "StepSharedAdd",
    "StepSharedInsert",
    "StockDown",
    "StockUp",
    "Stop",
    "StopSolid",
    "Stopwatch",
    "StoreLogo16",
    "StoreLogoMed20",
    "Storyboard",
    "Streaming",
    "StreamingOff",
    "StreamLogo",
    "Strikethrough",
    "Subscribe",
    "Subscript",
    "SubstitutionsIn",
    "Suitcase",
    "SunAdd",
    "Sunny",
    "SunQuestionMark",
    "Superscript",
    "SurveyQuestions",
    "SwayLogo16",
    "SwayLogo32",
    "SwayLogoFill16",
    "SwayLogoFill32",
    "SwayLogoInverse",
    "Switch",
    "SwitcherStartEnd",
    "Sync",
    "SyncFolder",
    "SyncOccurence",
    "SyncToPC",
    "System",
    "Tab",
    "Table",
    "Tablet",
    "TabletMode",
    "TabletSelected",
    "Tag",
    "Taskboard",
    "TaskGroup",
    "TaskGroupMirrored",
    "TaskLogo",
    "TaskManager",
    "TaskManagerMirrored",
    "TaskSolid",
    "Taxi",
    "TeamFavorite",
    "TeamsLogo",
    "TeamsLogoFill",
    "TeamsLogoInverse",
    "Teamwork",
    "Teeth",
    "TemporaryUser",
    "Tennis",
    "TestAutoSolid",
    "TestBeaker",
    "TestBeakerSolid",
    "TestCase",
    "TestExploreSolid",
    "TestImpactSolid",
    "TestParameter",
    "TestPlan",
    "TestStep",
    "TestSuite",
    "TestUserSolid",
    "TextBox",
    "TextCallout",
    "TextDocument",
    "TextDocumentShared",
    "TextField",
    "TextOverflow",
    "TFVCLogo",
    "ThisPC",
    "ThreeQuarterCircle",
    "ThumbnailView",
    "ThumbnailViewMirrored",
    "Thunderstorms",
    "Ticket",
    "Tiles",
    "Tiles2",
    "TimeEntry",
    "Timeline",
    "TimelineDelivery",
    "TimelineMatrixView",
    "TimelineProgress",
    "Timer",
    "TimeSheet",
    "ToDoLogoBottom",
    "ToDoLogoInverse",
    "ToDoLogoTop",
    "ToggleBorder",
    "ToggleFilled",
    "ToggleOff",
    "ToggleThumb",
    "Toll",
    "Touch",
    "TouchPointer",
    "Trackers",
    "TrackersMirrored",
    "Train",
    "TrainSolid",
    "TransferCall",
    "Transition",
    "TransitionEffect",
    "TransitionPop",
    "TransitionPush",
    "Trending12",
    "TriangleDown12",
    "TriangleLeft12",
    "TriangleRight12",
    "TriangleShapeSolid",
    "TriangleSolid",
    "TriangleSolidDown12",
    "TriangleSolidLeft12",
    "TriangleSolidRight12",
    "TriangleSolidUp12",
    "TriangleUp12",
    "TriggerApproval",
    "TriggerAuto",
    "TriggerUser",
    "TripleColumn",
    "TripleColumnEdit",
    "Trophy",
    "Trophy2",
    "Trophy2Solid",
    "TurnRight",
    "TVMonitor",
    "TVMonitorSelected",
    "TypeScriptLanguage",
    "Umbrella",
    "Underline",
    "Undo",
    "Uneditable",
    "UneditableMirrored",
    "UneditableSolid12",
    "UneditableSolidMirrored12",
    "Unfavorite",
    "UngroupObject",
    "Unknown",
    "UnknownCall",
    "UnknownMirrored",
    "UnknownMirroredSolid",
    "UnknownSolid",
    "Unlock",
    "UnlockSolid",
    "Unpin",
    "Unsubscribe",
    "UnsyncFolder",
    "UnsyncOccurence",
    "Up",
    "Upload",
    "UserEvent",
    "UserFollowed",
    "UserPause",
    "UserRemove",
    "UserSync",
    "Vacation",
    "Variable",
    "VariableGroup",
    "VB",
    "VennDiagram",
    "VersionControlPush",
    "VerticalDistributeCenter",
    "Video",
    "VideoOff",
    "VideoSearch",
    "VideoSolid",
    "View",
    "ViewAll",
    "ViewAll2",
    "ViewDashboard",
    "ViewList",
    "ViewListGroup",
    "ViewListTree",
    "VisioDiagram",
    "VisioDocument",
    "VisioLogo",
    "VisioLogo16",
    "VisioLogoFill",
    "VisioLogoFill16",
    "VisioLogoInverse",
    "VisioLogoInverse16",
    "VisualBasicLanguage",
    "VisualsFolder",
    "VisualsStore",
    "VisualStudioIDELogo32",
    "VisualStudioLogo",
    "VoicemailForward",
    "VoicemailIRM",
    "VoicemailReply",
    "Volume0",
    "Volume1",
    "Volume2",
    "Volume3",
    "VolumeDisabled",
    "VSTSAltLogo1",
    "VSTSAltLogo2",
    "VSTSLogo",
    "Waffle",
    "WaffleOffice365",
    "WaitlistConfirm",
    "WaitlistConfirmMirrored",
    "Warning",
    "Warning12",
    "WebPublish",
    "Website",
    "Weights",
    "WhiteBoardApp16",
    "WhiteBoardApp32",
    "WifiEthernet",
    "WindDirection",
    "WindowEdit",
    "WindowsLogo",
    "Wines",
    "WipePhone",
    "WordDocument",
    "WordLogo",
    "WordLogo16",
    "WordLogoFill",
    "WordLogoFill16",
    "WordLogoInverse",
    "WordLogoInverse16",
    "Work",
    "WorkFlow",
    "WorkforceManagement",
    "WorkItem",
    "WorkItemBar",
    "WorkItemBarSolid",
    "WorkItemBug",
    "World",
    "WorldClock",
    "YammerLogo",
    "ZipFolder",
    "Zoom",
    "ZoomIn",
    "ZoomOut",
];
*/
