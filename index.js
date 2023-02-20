const {User} = require('./User');
const {Board} = require('./Board');
const {Cheese} = require('./Cheese');

//Assocation for board and user selection
Board.belongsTo(User);
User.hasMany(Board);

Board.belongsToMany(Cheese, {through: 'CheeseBoards'});
Cheese.belongsToMany(Board, {through: 'CheeseBoards'});
module.exports = {
    User,
    Board,
    Cheese
}