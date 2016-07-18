import { isArray, mergeWith } from 'lodash';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default (config) => {
    return mergeWith({}, config, {
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
                        ]
                    }
                },
                {
                    test: /\.(png|gif|jpe?g|svg)$/,
                    loader: 'file?name=img/[name].[hash:8].[ext]'
                },
                {
                    test: /\.ico/,
                    loader: 'file?name=img/[name].[hash:8].[ext]'
                },
                {
                    test: /\.styl/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].[contenthash:8].css'),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '\'production\''
            })
        ]
    }, (val, src) => {
        if (isArray(val)) {
            return val.concat(src);
        }
    });
}