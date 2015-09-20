var env = process.env.NODE_ENV || 'development';
var isDev = env === 'development';

module.exports = {
    Env: env,
    Permissions: {
        viewPage: 'viewPage'
    },
    Defaults: {
        width: 10,
        height: 10,
        difficulty: 1
    },
    Minimum: {
        width: isDev? 1 : 10,
        height: isDev? 1 : 10
    },
    boxWidth: 40,
    boxHeight: 35,
    Difficulties: {
        1: {
            id: 1,
            name: 'Very Easy',
            percent: 10
        },
        2: {
            id: 2,
            name: 'Easy',
            percent: 15
        },
        3: {
            id: 3,
            name: 'Medium',
            percent: 20
        },
        4: {
            id: 4,
            name: 'Hard',
            percent: 30
        },
        5: {
            id: 5,
            name: 'Nightmare',
            percent: 60
        },
        6: {
            id: 6,
            name: 'Impossibruuu!!',
            percent: 90
        }
    }
};