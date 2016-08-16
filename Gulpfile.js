var gulp = require('gulp');
var gulpLoadPugins = require('gulp-load-plugins');
var browserSync = require('browser-sync');
const del = require('del');

const $p = gulpLoadPugins();
const reload = browserSync.reload;

gulp.task('styles', function () {
    return gulp.src('src/styles/*.scss')
        .pipe($p.sass.sync().on('error', $p.sass.logError))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('templates', function () {
    return gulp.src('src/templates/**/*.html')
        .pipe($p.ngHtml2js({
            moduleName: function (file) {
                var pathParts = file.path.replace(/\\/g, '/').split('/');
                var folder = pathParts[pathParts.length - 2];
                if (folder === "view-framework") {
                    return "qui.viewFramework";
                } else {
                    return "qui.viewFramework." + folder.replace(/-[a-z]/g, function (match) {
                            return match.substr(1).toUpperCase();
                        });
                }
            },
            prefix: "qui/templates/"
        }))
        .pipe(gulp.dest(".tmp/templates"));
});

gulp.task('scripts', ['templates'], function () {
    return gulp.src(['src/scripts/**/*.js', '.tmp/templates/**/*.js'])
        .pipe($p.concat('main.js'))
        .pipe(gulp.dest(".tmp/scripts"))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('serve:demo', ['styles', 'scripts'], function () {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'demo'],
            routes: {
                '/src': 'src',
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch([
        'demo/**/*',
        'src/**/*',
        '.tmp/**/*'
    ]).on('change', reload);

    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    gulp.watch('src/templates/**/*.html', ['scripts']);
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('dist', ['styles', 'scripts'], function () {
});

gulp.task('default', ['clean'], function () {
    gulp.start('dist');
});