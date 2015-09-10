module.exports = {
    Env: process.env.NODE_ENV || 'development',
    Permissions: {
        viewPage: 'viewPage'
    },
    boxWidth: 55,
    boxHeight: 30,
    Difficulties: {
        1: {
            name: 'Very Easy',
            percent: 10
        },
        2: {
            name: 'Easy',
            percent: 15
        },
        3: {
            name: 'Medium',
            percent: 20
        },
        4: {
            name: 'Hard',
            percent: 30
        },
        5: {
            name: 'Nightmare',
            percent: 60
        },
        6: {
            name: 'Impossibruuu!!',
            percent: 90
        }
    }
};