let {src , dest } = require('gulp');
let gulp = require('gulp');
let browsersync = require('browser-sync').create();
let scss = require('gulp-sass');
let fileInclude = require('gulp-file-include');
let del = require('del');
// fs- file system - встроенная функция(метод) Gulp
let fs = require('fs');
let ttf2woff = require('gulp-ttf2woff');
let ttf2woff2 = require('gulp-ttf2woff2');
let fonter = require('gulp-fonter');

let autoprefixer = require("gulp-autoprefixer");
let clean_css = require("gulp-clean-css");
let rename = require("gulp-rename");
let uglify = require("gulp-uglify-es").default;
let imagemin = require("gulp-imagemin");
let newer = require('gulp-newer');
let plumber = require("gulp-plumber");


let path = {
  build: {
    html: 'dist/',
    css: 'dist/css/',
    js: 'dist/js/',
    img: 'dist/img/',
    fonts: 'dist/fonts/',
  },
  src: {
    html: ['src/*.html','!src/_*.html' ],
    scss: 'src/scss/style.scss',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*.{jpg,png,svg,gif,ico,webp}',
    fonts: 'src/fonts/**/*'
  },
  watch: {
    html: 'src/*.html',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*.{jpg,png,svg,gif,ico,webp}',
    fonts: 'src/fonts/**/*'
  },
  clean: './dist/'
}

function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: "./dist/"
		},
		notify: false,
		port: 3000,
	});
}
function html() {
  return src(path.src.html)
  .pipe(plumber())
  .pipe(fileInclude())
  .pipe(dest(path.build.html))
  .pipe(browsersync.stream());
}
function fonts() {
  return src(path.src.fonts)
  .pipe(plumber())  
  .pipe(dest(path.build.fonts))
  .pipe(browsersync.stream());
}
function css() {
  return src(path.src.scss)
  .pipe(plumber())
  .pipe(scss({
      outputStyle: "expanded"
    })
  )
  .pipe(
    autoprefixer({
      grid: true,
      overrideBrowserslist: ["last 5 versions"],
      cascade: true
    })
  )
  .pipe(dest(path.build.css))
  .pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
  .pipe(dest(path.build.css))
  .pipe(browsersync.stream());
}
function js() {
  return src(path.src.js)
  .pipe(plumber())
  .pipe(dest(path.build.js))
  .pipe(browsersync.stream());
}
function images() {
  return src(path.src.img)
  .pipe(newer(path.build.img))
  .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3 // 0 to 7
    })
  )
  .pipe(dest(path.build.img))
  .pipe(browsersync.stream());
}


// ==================СЦЕНАРИИ===============================================
function cleanDist() {
  return del(path.clean);
}
function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.scss], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.fonts], fonts);
}
let build = gulp.series(cleanDist, gulp.parallel(html, fonts, css, js, images));
let dev = gulp.parallel(build, watchFiles, browserSync);


exports.cleanDist = cleanDist;
exports.html = html;
exports.fonts = fonts;
exports.css = css;
exports.js = js;
exports.build = build;
exports.dev = dev;
exports.default = dev;