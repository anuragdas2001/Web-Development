// const gulp = require('gulp');
// const cssnano = require('gulp-cssnano');

// const rev = require('gulp-rev');

// import gulp from 'gulp';
// import cssnano from 'gulp-cssnano';
// import rev from 'gulp-rev';

// gulp.task('css',()=>{
//     console.log('minifying css ...');
//     gulp.src('./assets/css')
//     .pipe(css())
//     .pipe(cssnano())
//     .pipe(gulp.dest('./assets.css'));

//     return gulp.src('./assets/**/*.css')
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd:'public',
//         merge:true
//     }))
//     .pipe(gulp.dest('./public/assets'));
// });

// Import modules using ES module syntax
// import gulp from 'gulp';
// import cssnano from 'gulp-cssnano'; 
// import rev from 'gulp-rev';

// // Export task function  
// export function css() {
//   return gulp.src('./assets/**/*.css')
//     .pipe(cssnano())
//     .pipe(gulp.dest('./public/assets')) 
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//       cwd: 'public',
//       merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
// }

// // Define task using gulp API
// gulp.task('css', gulp.series(css));

// gulpfile.mjs

import gulp from 'gulp';
import cssnano from 'gulp-cssnano';
import rev from 'gulp-rev';

gulp.task('css', () => {
    console.log('minifying css ...');

    gulp.src('./assets/css')
        .pipe(cssnano())
        .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: 'public',
            merge: true
        }))
        .pipe(gulp.dest('./public/assets'));
});
