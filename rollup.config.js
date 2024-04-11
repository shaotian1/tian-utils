const {defineConfig} = require('rollup');
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require('@rollup/plugin-terser');
const {babel} = require('@rollup/plugin-babel');
const {dts} = require("rollup-plugin-dts");
const typescript = require("rollup-plugin-typescript2");

const pkg = require("./package.json");

module.exports = defineConfig([
    {
        input: './src/index.ts',
        output: [
            {
                name: pkg.name,
                format: 'es',
                dir: 'dist/esm',
                preserveModules: true,
                sourcemap: true
            },
            // {
            //     name: pkg.name,
            //     format: 'cjs',
            //     dir: 'dist/cjs',
            //     preserveModules: true, // 保留模块结构
            //     preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
            // },
            {
                name: pkg.name,
                format: 'umd',
                dir: 'dist/umd',
                plugins: [terser()]
            }
        ],
        plugins: [
            typescript(),

            // 处理外部依赖
            resolve(),

            babel({
                exclude: "**/node_modules/**",
                // babelHelpers: "bundled",
                babelHelpers: "runtime",
                extensions: ['.js', '.ts']
            }),

            // 支持基于 CommonJS 模块引入
            commonjs(),

            // terser插件在rollup打包过程当中实现代码压缩
            // terser()
        ]
    },
    // {
    //     input: 'src/index.ts',
    //     output: {
    //         dir: 'dist/types',
    //         format: 'esm',
    //         preserveModules: true,
    //     },
    //     plugins: [
    //         dts(),
    //     ],
    // }
]);