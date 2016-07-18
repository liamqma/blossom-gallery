import { mergeWith, isArray, includes } from 'lodash';
import webpack from 'webpack';
import path from 'path';
import ManifestPlugin from 'webpack-manifest-plugin';

export default {
    context: path.resolve(process.cwd(), 'lib', 'public'),
    entry: {
        main: [
            './scripts/index.js',
            './styles/main.styl'
        ]
    },
    output: {
        path: path.resolve(process.cwd(), 'build', 'static'),
        publicPath: '/assets/',
        filename: '[name].[chunkhash:8].js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    // Plugin transform-es2015-classes is used to fix IE issue (Parent constructor calls not working for IE <= 10)
                    // https://phabricator.babeljs.io/T3041
                    plugins: [
                        'transform-class-properties',
                        ['transform-es2015-classes', {loose: true}],
                        'transform-react-jsx'
                    ],
                    'env': {
                        // only enable it when process.env.NODE_ENV is 'development' or undefined
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
            }
        ]
    },
    resolve: {
        extensions: [
            '',
            '.js',
            '.styl'
        ],
        modulesDirectories: [
            'bower_components',
            'node_modules'
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
        ),
        new ManifestPlugin()
    ]
}