/**
 * Loads all the various grunt task config files we have
 * @param path string
 * @returns {*}
 */
function loadConfig(path) {
    var fs = require('fs');
    var configs = {};
    var key;

    var files = fs.readdirSync(path);
    files.forEach(function(file){
        key = file.replace('.js','');
        configs[key] = require('./' + path + file);
    });

    return configs;
}

/**
 * @module Grunt
 * @desc Grunt is our task runner
 */
module.exports = function(grunt) {
    // Load Grunt task options
	var gruntConfig = loadConfig('./tasks/options/');
    gruntConfig.pkg = grunt.file.readJSON('./package.json');

    // i18n parsing delimiters
    grunt.template.addDelimiters('custom', '{%','%}');

	// Load all Grunt modules
    require('load-grunt-tasks')(grunt);

    // Apply and load the Grunt config
    grunt.initConfig(gruntConfig);

    // Load the Grunt tasks
    grunt.loadTasks('tasks');
};