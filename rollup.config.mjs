import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import path from "path";

// rollup.config.js
/**
 * @type {import("rollup").RollupOptions}
 */
const Config = {
    input: "src/index.ts",
    output: [
        {
            sourcemap: true,
            dir: "lib",
            format: "es",
            name: "version",
            plugins: [terser()],
        },
    ],

    external: [
        "react",
        /^react-icons.*/,
        /^date-fns.*/,
        "react-dom",
        "react/jsx-runtime",
        "react-dates",
        "react-hook-form",
        "react-focus-lock",
        "immer",
        "use-immer",
    ],
    plugins: [
        typescript({ cacheDir: ".rollup.tscache" }),

        postcss({
            autoModules: true,
            modules: true,
            minimize: true,
            extract: path.resolve("lib/styles.css"),
            plugins: [],
        }),
    ],
};
export default Config;
