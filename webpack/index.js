import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsWebpackPlugin from 'assets-webpack-plugin';
import autoprefixer from 'autoprefixer';

import entry from './entry';

const env = process.env.NODE_ENV;
const isDevEnv = env === 'local';
const ROOT_PATH = path.join(__dirname, '..');
const RELATIVE_NODE_PATH = 'node_modules';
const NODE_PATH = path.join(ROOT_PATH, 'node_modules');
const PUBLIC_PATH = path.join(ROOT_PATH, 'public');

// pugins
const extractCssPlugin = new ExtractTextPlugin('[name]-[contenthash:16].css');
const assetsPlugin = new AssetsWebpackPlugin({ path: PUBLIC_PATH });
const defineEnvPlugin = new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(isDevEnv ? 'development' : 'production') },
});
const cleanPlugin = new CleanWebpackPlugin(CONS.ASSETS_PATH, { root: CONS.rootPath });
const hmrPlugin = new webpack.HotModuleReplacementPlugin();
const genCommonChunkPlugin = commonChunkName => (
    new webpack.optimize.CommonsChunkPlugin({
        name: commonChunkName,
        filename: methods.fileHash(`${commonChunkName}.js`),
        minChunks: Infinity,
    })
);

const plugins = [
    extractCssPlugin,
    assetsPlugin,
    defineEnvPlugin,
    genCommonChunkPlugin('admin-vendor'),
    cleanPlugin,
];

if (isDevEnv) {
    plugins.push(hmrPlugin);
}

// loader
const reactLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: isDevEnv ? ['react-hot-loader', 'babel-loader'] : ['cache-loader', 'babel-loader'],
};

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: () => [autoprefixer({ config: './browserslist' })],
    },
};

const cssLoader = {};

const imageLoader = {
    test: /\.(png|svg|jpg)$/,
    loader: 'url-loader',
    include: path.resolve('images'),
    options: {
        limit: 5000,
        name: '[path][sha512:hash:base64:16].[ext]',
    },
};

const webpackConfig = [
    {
        entry: Object.assign({}, entry, {
            'admin-vendor': [
                'react',
                'react-dom',
                'dva',
                'isomorphic-fetch',
                'config',
            ]
        }),
        output: {
            path: PUBLIC_PATH,
            filename: methods.fileHash('[name].js'),
            publicPath: PUBLIC_PATH,
        },
        plugins,
        module: {
            rules: [reactLoader, cssLoader, imageLoader]
        },
        resolve: {
            modules: [
                ROOT_PATH,
                RELATIVE_NODE_PATH,
                NODE_PATH
            ],
        },
        resolveLoader: {
            modules: [
                NODE_PATH,
            ],
        },
        devtool: isDevEnv ? '#eval' : false,
    }
];

webpackConfig.devServer = {
    stats: 'minimal',
    hot: true,
    publicPath: PUBLIC_PATH,
    disableHostCheck: true,
};

export default webpackConfig