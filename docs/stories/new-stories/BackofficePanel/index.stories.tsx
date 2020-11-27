import React from "react";
import { storiesOf } from "@storybook/react";

import { BackOfficePanel } from "../../../../src/backoffice";
import { HeightAdjuster } from "../../../../src/HeightAdjuster";
import { router } from "../../../../src/backoffice/Router";
import { Navbar } from "../../../../src/Navbar";
const iframeCorrection = window.parent.document.getElementById("storybook-preview-iframe").getBoundingClientRect().top;

import demoPageOne from "./demoPageOne";

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
                icon="AirplaneSolid"
                title="Test panel"
                menu={[
                    {
                        icon: "Page",
                        title: "CMS ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: "Page", title: "Pages", route: "/test/page1" },
                            { icon: "Page", title: "Posts", route: "/test/page2" },
                            { icon: "Page", title: "Events", route: "/pages" },
                        ],
                    },
                    {
                        icon: "ShoppingCart",
                        title: "E-commerce ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: "Page", title: "Orders", route: "/pages" },
                            { icon: "Accounts", title: "Customers", route: "/pages" },
                            { icon: "Page", title: "Shipping", route: "/pages" },
                            { icon: "Page", title: "Products", route: "/pages" },
                        ],
                    },
                    {
                        icon: "AppIconDefault",
                        title: "ERP ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: "Page", title: "Production", route: "/pages" },
                            { icon: "Page", title: "Reports", route: "/pages" },
                            { icon: "Page", title: "Logistic", route: "/pages" },
                        ],
                    },
                    {
                        icon: "Unsubscribe",
                        title: "System ",
                        active: true,
                        opened: true,
                        elements: [
                            { icon: "Page", title: "Accounts", route: "/pages" },
                            { icon: "Page", title: "Settings", route: "/pages" },
                            { icon: "Page", title: "Logs", route: "/pages" },
                        ],
                    },
                ]}
            />
        </HeightAdjuster>
    </>
));
