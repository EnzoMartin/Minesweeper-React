# Minesweeper React

Minesweeper clone built in React

* [Features](#features)
* [First time install for Development](#first-time-install-for-development)
* [Environment Variables](#environment-variables)

# Features

* Generates a map with bombs based off entered settings
* Saves settings to localStorage
* Saves in-progress game to localStorage and resumes when returning/refreshing
* Win/loss condition and basic timer
* Toggle Flags by right clicking
 
### Possible future
* Optimize large map generation
* Generate seed/hash to share a generated map
* Basic leaderboards for fun, possibly with Google+ sign-in
    
# First time install for Development

* Download and install the latest [NodeJS][nodejs]
* Download and install [Python 2.7.3][python] and ensure it's available in the command line
* Clone the repo
* Follow the [Node Gyp setup guide]
* Run `npm install grunt-cli mocha node-gyp -g`
* Run `npm install` from the repo base directory
* Run `grunt --force` to start the main grunt task that builds the CSS, etc.
* Run `node app.js` to start the application
* Navigate to [http:localhost:3000](http:localhost:3000)

# Environment Variables
| Name  | Description |
| ------------- | ------------- |
| NODE_ENV | Set the environment |

[nodejs]: http://nodejs.org/
[python]: http://www.python.org/download/releases/2.7.3#download
[config.js]:config/config.js
[local]:config/example.local.js
[Redis]:http://redis.io/
[redis-windows]:https://github.com/MSOpenTech/redis/releases
[DataDog]:https://app.datadoghq.com/
[integrations]:https://app.datadoghq.com/account/settings
[NGINX configuration file]:config/nginx.conf
[NGINX]:http://wiki.nginx.org/Install
[MySQL]:http://www.mysql.com/
[Node Gyp setup guide]:https://github.com/TooTallNate/node-gyp#installation
