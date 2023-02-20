const {Sequelize, sequelize} = require('./db');

const User = sequelize.define('User', {

    //Keys
    name: Sequelize.STRING,
    email: Sequelize.STRING

});

module.exports = {
    User
}