const {src, dest, watch, parallel, series} = require('gulp');

const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const uglify       = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');

function browsersync () {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function cleanDist () {
    return del('dist');
}

function images () {
    return src('app/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function scripts () {
    return src ([
        'app/js/main.js'
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function styles () {
    return src('app/scss/styles.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version']
        }))
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream()),
        src('app/scss/styles.scss')
        .pipe(scss({outputStyle: 'expanded'}))
        .pipe(dest('app/css'))
}

function build () {
    return src([
        'app/*.html',
        'app/css/style.min.css',
        'app/css/bootstrap-grid.css',
        'app/js/main.js',
        'app/fonts/**/*'
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function watching () {
    watch (['app/scss/**/*.scss'], styles);
    watch (['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch (['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.images = images;

exports.build = series(cleanDist, images, build);
exports.default = parallel(scripts, browsersync, watching);