const {User} = require('./User');
const {Board} = require('./Board');
const {Cheese} = require('./Cheese');
const { DataTypes } = require('sequelize');
const {Sequelize, sequelize} = require('sequelize');

//Assocation for board and user selection
Board.belongsTo(User);
User.hasMany(Board);

//const Cheese_Boards = sequelize.define('Cheese_Boards', {timeStamps: false});

Board.belongsToMany(Cheese, {through: 'Cheese_Boards'});
Cheese.belongsToMany(Board, {through: 'Cheese_Boards'});

module.exports = {
    User,
    Board,
    Cheese
}