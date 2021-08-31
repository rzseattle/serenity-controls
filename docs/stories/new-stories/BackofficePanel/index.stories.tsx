import React from "react";
import { storiesOf } from "@storybook/react";

import { BackOfficePanel } from "../../../../src/backoffice";
import { HeightAdjuster } from "../../../../src/HeightAdjuster";
import { router } from "../../../../src/backoffice/Router";
import demoPageOne from "./demoPageOne";


import {     MdAssessment,
    MdAssignment,
    MdComputer,
    MdEvent,
    MdLanguage,
    MdLocalShipping,
    MdPeople,
    MdPublic,
    MdSettingsApplications,
    MdSettings,
    MdShoppingBasket,
    MdShoppingCart,
    MdSubject, } from "react-icons/md";

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
                icon={MdPublic}
                title="Test panel"
                menu={[
                    {
                        icon: MdLanguage,
                        title: "CMS ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: MdPublic, title: "Pages", route: "/test/page1" },
                            { icon: MdSubject, title: "Posts", route: "/test/page2" },
                            { icon: MdEvent, title: "Events", route: "/pages" },
                        ],
                    },
                    {
                        icon: MdShoppingCart,
                        title: "E-commerce ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: MdSubject, title: "Orders", route: "/pages" },
                            { icon: MdPeople, title: "Customers", route: "/pages" },
                            { icon: MdLocalShipping, title: "Shipping", route: "/pages" },
                            { icon: MdShoppingBasket, title: "Products", route: "/pages" },
                        ],
                    },
                    {
                        icon: MdAssignment,
                        title: "ERP ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: MdSettingsApplications, title: "Production", route: "/pages" },
                            { icon: MdAssessment, title: "Reports", route: "/pages" },
                            { icon: MdLocalShipping, title: "Logistic", route: "/pages" },
                        ],
                    },
                    {
                        icon: MdComputer,
                        title: "System ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: MdPeople, title: "Accounts", route: "/pages" },
                            { icon: MdSettings, title: "Settings", route: "/pages" },
                            { icon: MdSubject, title: "Logs", route: "/pages" },
                        ],
                    },
                ]}
            />
        </HeightAdjuster>
    </>
));
