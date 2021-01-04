/**
 * @file Vue-CLI 配置文件
 */
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

// 将打包后的 JS/CSS/IMG/FONTS 等资源统一放到 static 目录中
const ASSERTS_DIR = 'static';

module.exports = {
    lintOnSave: isDev ? 'warning' : false,
    assetsDir: isDev ? '' : ASSERTS_DIR,
    publicPath: './',
    devServer: {
        port: 8006,
        disableHostCheck: true,
        proxy: {
            '/inspection': {
                target: 'http://test-telecontrol.baidu.com',
                changeOrigin: true,
                ws: true
            }
        }
    },
    productionSourceMap: false,
    configureWebpack: {
        plugins: [
            new StyleLintPlugin({
                files: ['src/**/*.{vue,htm,html,css,sss,less,scss,sass}']
            })
        ]
    },
    chainWebpack: (config) => {
        // 自动导入样式文件
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
        types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)));

        // 配置 TypeScript 检查配置
        // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#options
        config.plugin('fork-ts-checker').tap((option) => {
            option[0].async = false;
            return option;
        });

        // 编译时去除 console
        if (process.env.NODE_ENV !== 'development') {
            config.optimization.minimizer('terser').tap((args) => {
                // eslint-disable-next-line
                args[0].terserOptions.compress.drop_console = true;
                // eslint-disable-next-line
                args[0].terserOptions.compress.drop_debugger = true;
                return args;
            });
        }

        // 移除 prefetch 插件
        // config.plugins.delete('prefetch');
    }
};

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/styles/variables.scss'),
                path.resolve(__dirname, './src/styles/mixins.scss'),
                path.resolve(__dirname, './src/styles/functions.scss')
            ]
        });
}
