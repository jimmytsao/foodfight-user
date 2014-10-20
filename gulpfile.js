'use strict';

var gulp          = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var browserify    = require('gulp-browserify');
var jshint        = require('gulp-jshint');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var clean         = require('gulp-clean');
var karma         = require('gulp-karma');
var protractor    = require('gulp-protractor').protractor;
var shell         = require('gulp-shell');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;

/*******************************************************
 *            File Paths and Values
 ******************************************************/


var paths = {
  clientScripts: {
    //All js files except the compiled templateCache.js file
    src: ['client/app/**/*.js', '!client/app/modules/templateCache.js', '!client/app/lib/**/*.js', '!client/app/ionic.bundle.js'],
    //Destination of browserified files
    dest: 'client/ionic/www'
  },

  htmlTemplates: {
    //All html files in the modules folder
    src: ['client/app/modules/**/*.html'],
    //Destination of templateCached file
    dest: 'client/app/modules',
    //Name of templateCached file
    templateCacheName: 'templateCache.js'
  },

  index: {
    //Location of index.html file
    src: ['client/app/index.html'],
    //Public location of index.html file
    dest: 'client/ionic/www'
  },

  sassFiles: {
    //sassfiles
    src: ['client/app/**/*.scss'],
    mainSrc: ['client/app/styles.scss'],
    dest: 'client/ionic/www'
  },

  //Location of files to serve for livereload
  livereloadRoot: 'client/ionic/www',

  //Main js file client side
  mainClientAppFile: 'client/app/app.js',

  //Name of main app module in main client js file
  ngAppName: 'app',

  publicPathsToClean: ['client/ionic/www/**/*.html', 'client/ionic/www/**/*.js', 'client/ionic/www/**/*.css', '!client/ionic/www/ionic.bundle.js'],

  buildPathsToClean: ['client/ionic/platforms/**/*'],

  karmaTestFiles: ['client/app/**/*.unit.test.js'],

  karmaConfigFile: 'client/app/config/karma.config.js',


//Protractor Setup - (taken care of if you use npm run-script setup)
//Make sure you update the webdriver-manager after a clean npm install (it will add the Jar file and chrome driver):
//  ./node_modules/protractor/bin/webdriver-manager update
//Make sure the line 28 in the protractor config file is pointing to the right Jar file
//  seleniumServerJar: '../../../node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar'
//Make Sure the chromium driver on line 40 is pointing to the correct path
//  chromeDriver: '../../../node_modules/protractor/selenium/chromedriver'

  protractorTestFiles: ['client/app/**/*.e2e.test.js'],

  protractorConfigFile: 'client/app/config/protractor.config.js'
};

/*******************************************************
 *            Client Side Build Tasks 
 ******************************************************/

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: paths.clientScripts.dest
    }
  });
});

//Convert all html partials for the app and add them to the $templateCache in the 'app' module
gulp.task('templateCache', function(){
	gulp
    .src(paths.htmlTemplates.src)
		.pipe(templateCache(paths.htmlTemplates.templateCacheName,{module: paths.ngAppName}))
		.pipe(gulp.dest(paths.htmlTemplates.dest));
});

//Concatenate all of the dependencies in app.js via Browserify
gulp.task('browserify', function(){
  gulp
    .src([paths.mainClientAppFile])
    .pipe(browserify())
    .pipe(gulp.dest(paths.clientScripts.dest))
    .pipe(reload({stream:true}));
});

//Lint files with jshint
gulp.task('clientLint', function(){
  gulp
    .src(paths.clientScripts.src)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

});


//Watch files and recompile when changes occur
gulp.task('clientWatch', ['browser-sync'],function(){
  gulp.watch(paths.clientScripts.src, ['clientLint', 'browserify']);
  gulp.watch(paths.htmlTemplates.src, ['templateCache', 'browserify']);
  gulp.watch(paths.sassFiles.src, ['styles']);
  gulp.watch(paths.index.src, ['index']);
});

//Move index.html file into public folder
gulp.task('index', function() {
  gulp
    .src(paths.index.src)
    .pipe(gulp.dest(paths.index.dest))
    .pipe(reload({stream:true}));
});

//Compile styles
gulp.task('styles', function() {
  gulp
    .src(paths.sassFiles.mainSrc)
    // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
    .pipe(sass({onError: function(e) { console.log('Sass Compilation Error: ',e); } }))
    // Optionally add autoprefixer
    .pipe(autoprefixer("last 2 versions", "> 1%"))
    .pipe(gulp.dest(paths.sassFiles.dest))
    .pipe(reload({stream:true}));
});

//Delete Public Files
gulp.task('clean', function(){
  return gulp
    .src(paths.publicPathsToClean, {read:false})
    .pipe(clean());
});


/*******************************************************
 *            Client Side Testing Tasks 
 ******************************************************/

gulp.task('karma', function(){
  return gulp
    .src(paths.karmaTestFiles)
    .pipe(karma({configFile: paths.karmaConfigFile, action: 'run'}));
});

gulp.task('protractor', function(){
  gulp.src(paths.protractorTestFiles)
    .pipe(protractor({
        configFile: paths.protractorConfigFile
    }))    
    .on('error', function(e) {console.log('Protractor Error: ', e);});
});

/*******************************************************
 *            Defined Task Groups
 ******************************************************/

//Delete Ionic Platform Files
gulp.task('test', ['karma']);
gulp.task('buildIos', shell.task(['npm run-script rebuild']));
gulp.task('clientBuildTasks', ['clean', 'clientLint', 'templateCache', 'browserify', 'styles', 'index', 'clientWatch']);
gulp.task('clientTestingTasks', ['karma', 'protractor']);
gulp.task('default', ['clientBuildTasks']);
