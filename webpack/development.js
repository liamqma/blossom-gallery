import { isArray, mergeWith } from 'lodash';
import webpack from 'webpack';

export default (config) => {
    // add webpack dev tools
    config.entry.main.unshift(
        'webpack-dev-server/client?http://localhost:9876',
        'webpack/hot/dev-server'
    );

    return mergeWith({}, config, {
        devtool: 'source-map',
        output: {
            filename: '[name].js',
            pathinfo: true
        },
        module: {
            loaders: [
                {
                    test: /\.js/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015'],
                        plugins: [
                            'transform-class-properties',
                            ['transform-es2015-classes', {loose: true}],
                            'transform-react-jsx'
                        ],
                        'env': {
                            'development': {
                                'plugins': [['react-transform', {
                                    'transforms': [{
                                        'transform': 'react-transform-hmr',
                                        'imports': ['react'],
                                        'locals': ['module']
                                    }]
                                }]]
                            }
                        }
                    }
                },
                {
                    test: /\.(png|gif|jpe?g|svg)$/,
                    loader: 'file?name=img/[name].[ext]'
                },
                {
                    test: /\.ico/,
                    loader: 'file?name=img/[name].[ext]'
                },
                {
                    test: /\.styl/,
                    loader: 'style-loader!css-loader!stylus-loader'
                },
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    }, (val, src) => {
        if (isArray(val)) {
            return val.concat(src);
        }
    });
}