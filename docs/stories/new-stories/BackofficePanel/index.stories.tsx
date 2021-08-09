import React from "react";
import { storiesOf } from "@storybook/react";

import { BackOfficePanel } from "../../../../src/backoffice";
import { HeightAdjuster } from "../../../../src/HeightAdjuster";
import { router } from "../../../../src/backoffice/Router";
import demoPageOne from "./demoPageOne";
import {
    AssessmentOutlined,
    AssignmentOutlined,
    ComputerOutlined,
    EventOutlined,
    Language,
    LocalShippingOutlined,
    PeopleAltOutlined,
    Public,
    SettingsApplicationsOutlined,
    SettingsOutlined,
    ShoppingBasketOutlined,
    ShoppingCartOutlined,
    SubjectOutlined,
} from "@material-ui/icons";

const iframeCorrection = window.parent.document.getElementById("storybook-preview-iframe").getBoundingClientRect().top;

router.registerRoutes({
    test_page: {
        baseRoutePath: "test",
        routePath: "/test/page1",
        componentObject: demoPageOne,
        componentName: "test",
        _debug: {
            file: "--",
            componentExists: true,
            templateExists: false,
            line: 0,
            template: "",
        },
        useAutoRequest: false,
    },
});

router.registerDefaultView("/test/page1");

storiesOf("Backoffice Panel/BackofficePanel", module).add("Base", () => (
    <>
        <HeightAdjuster offsetTopCorrection={iframeCorrection}>
            <BackOfficePanel
                user={{ login: "test" }}
                icon={Public}
                title="Test panel"
                menu={[
                    {
                        icon: Language,
                        title: "CMS ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: Public, title: "Pages", route: "/test/page1" },
                            { icon: SubjectOutlined, title: "Posts", route: "/test/page2" },
                            { icon: EventOutlined, title: "Events", route: "/pages" },
                        ],
                    },
                    {
                        icon: ShoppingCartOutlined,
                        title: "E-commerce ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: SubjectOutlined, title: "Orders", route: "/pages" },
                            { icon: PeopleAltOutlined, title: "Customers", route: "/pages" },
                            { icon: LocalShippingOutlined, title: "Shipping", route: "/pages" },
                            { icon: ShoppingBasketOutlined, title: "Products", route: "/pages" },
                        ],
                    },
                    {
                        icon: AssignmentOutlined,
                        title: "ERP ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: SettingsApplicationsOutlined, title: "Production", route: "/pages" },
                            { icon: AssessmentOutlined, title: "Reports", route: "/pages" },
                            { icon: LocalShippingOutlined, title: "Logistic", route: "/pages" },
                        ],
                    },
                    {
                        icon: ComputerOutlined,
                        title: "System ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: PeopleAltOutlined, title: "Accounts", route: "/pages" },
                            { icon: SettingsOutlined, title: "Settings", route: "/pages" },
                            { icon: SubjectOutlined, title: "Logs", route: "/pages" },
                        ],
                    },
                ]}
            />
        </HeightAdjuster>
    </>
));
