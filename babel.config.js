/**
 * @file Babel 配置文件
 */
module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'component',
            {
                // 按需引入 ElementUI，如果有自定义主题，需要将 styleLibraryName 改为 ~theme，theme 为路径
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ]
    ]
};
