module.exports = function(grunt) {
    grunt.registerTask('default','Compiles the entire application and places a watch of changes to js/scss files',function(){
        var tasks = [
            'webpack-dev-server'
        ];

        grunt.option('force', true);
        grunt.task.run(tasks);
    });
};