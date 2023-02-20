const {Sequelize, sequelize} = require('./db');

const Cheese = sequelize.define('Cheese', {

    //Keys
    title: Sequelize.STRING,
    description: Sequelize.STRING

});

module.exports = {
    Cheese
}