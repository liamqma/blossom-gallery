import gulp from 'gulp';
import gutil from 'gulp-util';
import zip from 'gulp-zip';
import babel from "gulp-babel";
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackDev from './webpack/development';
import webpackProd from './webpack/production';
import webpackStream from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-babel-istanbul';
import nodemon from 'gulp-nodemon';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';
import { argv } from 'yargs';

gulp.task('default', () => {
    console.log("#####################################################");
    console.log("To develop, run 'gulp develop'");
    console.log("Also make sure you have a local.yaml in lib/config");
    console.log("#####################################################");
});

gulp.task('develop', ['webpack-dev-server'], () => {
    return nodemon({
        script: './index.js',
        ext: 'js yaml',
        env: {
            NODE_ENV: 'development'
        },
        watch: [
            './lib',
            '!./lib/common',
            './index.js'
        ]
    });
});

gulp.task('webpack', () => {
    const config = webpackProd(webpackConfig);
    return webpackStream(config)
        .pipe(svgSizer())
        .pipe(gulp.dest('./build/static/assets'));
});

gulp.task('webpack-dev-server', () => {
    const config = webpackDev(webpackConfig);
    const server = new WebpackDevServer(webpack(config), {
        hot: true,
        publicPath: '/assets/'
    });
    server.listen(9876, 'localhost', (err) => {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }
        gutil.log('webpack-dev-server', 'running on localhost:9876');
    });
});

gulp.task('lint-server', () => {
    return gulp.src([
        './lib/**/*.js',
        '!./lib/public/**'
    ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint-client', () => {
    return gulp.src(['./lib/public/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint', ['lint-server', 'lint-client']);