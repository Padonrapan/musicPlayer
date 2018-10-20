var gulp = require('gulp');
var htmlClean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');//压缩js代码插件
var stripDebug = require('gulp-strip-debug');//去掉js代码里边的调试代码插件
var concat = require('gulp-concat');//拼接js代码插件
var less = require('gulp-less');//将less编译成css的插件
var postcss = require('gulp-postcss');//提交添加前缀和压缩css代码插件
var autoprefixer = require('autoprefixer');//添加前缀
var cssnano = require('cssnano');//压缩css代码
var connect = require('gulp-connect');//开启本地服务器
//gulp的四个API
//gulp.src()//读文件
//gulp.dest()//写文件
//gulp.task()//创建任务
//gulp.watch()//监听任务
var devMode = process.env.NODE_ENV == 'development';
console.log(devMode);

var folder = {
    src:'src/',
    dist:'dist/'
};
gulp.task('html',function(){
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
    if(!devMode){
        page.pipe(htmlClean())
    }        
        page.pipe(gulp.dest(folder.dist + 'html/'));
})

gulp.task('images',function(){
    gulp.src(folder.src + 'images/*')
        .pipe(connect.reload())
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + 'images/'));
})

gulp.task('js',function(){
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
    if(!devMode){
        page.pipe(uglify())
        .pipe(stripDebug());
    }
        //pipe(concat('main.js'))//concat参数为拼接之后的文件名称
        page.pipe(gulp.dest(folder.dist + 'js/'));
})

gulp.task('css',function(){
    var options = [autoprefixer(),cssnano()];//注意先添加前缀后压缩,反过来的话前缀会添加不成功
    var page = gulp.src(folder.src + 'css/*')
        .pipe(less())
        .pipe(connect.reload())
    if(!devMode){
        page.pipe(postcss(options))
    }
        page.pipe(gulp.dest(folder.dist + 'css/'));
})

gulp.task('watch',function(){
    gulp.watch(folder.src + 'html/*',['html']);
    gulp.watch(folder.src + 'images/*',['images']);
    gulp.watch(folder.src + 'css/*',['css']);
    gulp.watch(folder.src + 'js/*',['js']);
})

gulp.task('server',function(){
    connect.server({
        port:'8090',
        livereload:true
    });
})
gulp.task('default',['html','images','js','css','watch','server']);

