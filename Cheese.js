const {Sequelize, sequelize} = require('./db');

const Cheese = sequelize.define('Cheese', {

    //Keys
    title: Sequelize.STRING,
    description: Sequelize.STRING

},  { timestamps: false });

module.exports = {
    Cheese
}