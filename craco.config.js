const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#78c1fe' }, //#1DA57A
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};