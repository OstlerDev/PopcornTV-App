var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    files: './**/**', // use the glob format
    platforms: ['win32', 'win64', 'osx32', 'osx64', 'linux32', 'linux64'],
    appName: 'PopcornTV',
    macIcns: './Resources/Mac/icon.icns',
    macZip: false
});

//Log stuff you want

nw.on('log',  console.log);

// Build returns a promise
nw.build().then(function () {
   console.log('all done!');
}).catch(function (error) {
    console.error(error);
});