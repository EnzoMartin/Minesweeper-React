module.exports = {
    Env: process.env.NODE_ENV || 'development',
    Permissions: {
        viewPage: 'viewPage'
    },
    boxWidth: 55,
    boxHeight: 30,
    Difficulties: {
        1: {
            name: 'Easy',
            percent: 10
        },
        2: {
            name: 'Medium',
            percent: 25
        },
        3: {
            name: 'Hard',
            percent: 40
        },
        4: {
            name: 'Nightmare',
            percent: 60
        }
    }
};