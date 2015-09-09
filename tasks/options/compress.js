var packageJSON = require('../../package.json');
var dependencies = Object.keys(packageJSON.dependencies);

var modules = dependencies.reduce(function(items,item){
    items.push('node_modules/' + item + '/**/*');
    return items;
},[]);

module.exports = {
    main:{
        options:{
            archive:'application.zip',
            pretty:false
        },
        files:[
            {
                expand: true,
                src : [
                    'package.json',
                    'server-src/**/*',
                    'public/**/*',
                    'config/**/*',
                    'app.js',
                    'deploy.cmd',
                    '.deployment',
                    '!README.md',
                    '!tasks/*',
                    '!Gruntfile.js',
                    '!client-src/*',
                    '!application.zip'
                ].concat(modules),
                extDot: 'last'
            }
        ]
    }
};