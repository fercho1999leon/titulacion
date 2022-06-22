const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
//SCRIPT PARA EL LOGIN
mix.js('resources/js/scriptlogin.js', 'public/js')
    .react()
    .sass('resources/sass/stylelogin.scss', 'public/css');
//SCRIPT PARA EL POST LOGIN (DASHBOARD)
mix.js('resources/js/scriptpostlogin.js', 'public/js')
   .react()
   .sass('resources/sass/stylepostlogin.scss', 'public/css');