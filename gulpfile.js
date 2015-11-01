var gulp = require('gulp');
var typescript = require('gulp-tsc');
var maps = require('gulp-sourcemaps');
var del = require('del');
var seq = require('run-sequence');
var tsd = require('gulp-tsd');

var tsOpts = {
    outDir: 'dist',
    declaration: true,
    noImplicitAny: true,
    removeComments: false,
    target: 'ES5',
    sourceMap: true,
    module: 'commonjs'
};

var paths = {
    dist: './dist',
    test: './test',
    testBin: './test/bin'
};

var files = {
    main: 'tspatternmatching.ts',
    test: {index: 'index.html', ts: 'test.ts', js: 'test.js', jsmap: 'test.js.map'}
};

gulp.task('compile:src', function () {
    return gulp.src(files.main)
        .pipe(maps.init())
        .pipe(typescript(tsOpts))
        .pipe(maps.write('./'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('compile:test', function () {
    var tsTest = gulp.src([
        paths.test + '/' + files.test.ts
    ]);

    // clone opts
    var testOpts = JSON.parse(JSON.stringify(tsOpts));
    testOpts.outDir = paths.test;
    testOpts.declaration = false;
    tsTest.sourceMap = false;

    return tsTest
        .pipe(typescript(testOpts))
        .pipe(gulp.dest((paths.test)));
});

gulp.task('build-tests', function () {
    return gulp.src([
            './dist/*.js',
            paths.test + '/' + files.test.js,
            paths.test + '/' + files.test.index
        ])
        .pipe(gulp.dest(paths.testBin));
});

gulp.task('compile', function () {
    return seq('tsd:install', 'clean', 'compile:src', 'compile:test', 'build-tests');
});

gulp.task('tsd:install', function (callback) {
    tsd({
        command: 'reinstall',
        config: './tsd.json'
    }, callback);
});

gulp.task('clean', function () {
    return del([
        paths.test + '/' + files.test.js,
        paths.test + '/' + files.test.jsmap,
        paths.testBin
    ]);
});

gulp.task('default', ['compile']);
