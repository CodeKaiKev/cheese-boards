const {Sequelize, sequelize} = require('./db');

const Board = sequelize.define('Board', {

    //Keys
    type: Sequelize.STRING,
    description: Sequelize.STRING,
    rating: Sequelize.NUMBER


}, { timestamps: false });

module.exports = {
    Board
}