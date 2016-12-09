var path = require('path');


module.exports = {
    entry: './src/main.js',
    output: {
        path: './build',
        filename: 'app.bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, './src')],
                loader: 'babel'
            }
        ],
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            // vuex: 'vuex/dist/vuex.js',
            // vueRouter: 'vue-router/dist/vue-router.js'
        }
    }
};
