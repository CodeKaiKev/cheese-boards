const {sequelize} = require('./db');
const {Cheese, Board, User} = require('./index');


describe('Cheese Boards', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });

    })
    afterEach(async () => {
        //End of each test
         //await sequelize.sync({ force: true });
    })
    
    test('can create a User', async () => {
        // TODO - test creating a user
        const testUser = await User.create({ name: 'Kevin', email: 'Kevin@example.com' });
        expect(testUser.name).toBe('Kevin');
        expect(testUser.email).toBe('Kevin@example.com');
        expect(testUser.id).toBe(1);
    })

    test('can create a Cheese', async () => {
        // TODO - test creating a cheese
        const testCheese = await Cheese.create({ title: 'Cheddar', description: "Classic American Cheese"});
        expect(testCheese.title).toBe('Cheddar');
        expect(testCheese.description).toBe('Classic American Cheese');
        expect(testCheese.id).toBe(1);
    })

    test('can create a Board', async () => {
        // TODO - test creating a board
        const testBoard = await Board.create({ type: 'Bamboo', description: "10 year old Bamboo from Japan", rating: 7 });
        expect(testBoard.type).toBe('Bamboo');
        expect(testBoard.description).toBe('10 year old Bamboo from Japan');
        expect(testBoard.rating).toBe(7);
        expect(testBoard.id).toBe(1);
    })

    test('One-to-Many relationship user & board', async () => {
        await sequelize.sync({ force: true });
        const testUser = await User.create({ name: 'Kevin', email: 'Kevin@example.com' });
        const testBoard = await Board.create({ type: 'Bamboo', description: "10 year old Bamboo from Japan", rating: 7 });
        const someUser = await User.findByPk(1);
        await someUser.addBoard(1);

        const board2 = await Board.findByPk(1);
        // console.log(board2);
        await board2.setUser(someUser);


        const checker = await someUser.getBoards();
        expect((await board2.getUser()).id).toBe(someUser.id);
        expect(checker[0].id).toBe(board2.id);
        console.log(await User.findAll());
    })

    test('Testing many-many relationship with boards and cheeses & eager loading', async () => {
        await sequelize.sync({ force: true });

        const testUser = await User.create({ name: 'Leon', email: 'leon@example.com' });

        const testBoard = await Board.create({type: 'Lanton', description: 'Used to eat food off', rating : 3});
        const testBoard2 = await Board.create({type: 'Choco', description: 'nice studd', rating: 8});

        testBoard.setUser(testUser);
        testBoard2.setUser(testUser);

        testUser.addBoard(testBoard);
        testUser.addBoard(testBoard2);
        
        const newCheese = await Cheese.create({title: 'Cheese', description: 'feda cheese'});
        const testCheese = await Cheese.create({ title: 'Cheddar', description: "Classic American Cheese"});
        const goatCh = await Cheese.create({ title: 'Halloumi', description: "Fried cheese"});
        const indiaCheese = await Cheese.create({ title: 'Paneer', description: "Fried cheese India"});


        testBoard.addCheeses([newCheese, testCheese, indiaCheese, goatCh], {through: {item: 'cheese'}});
        //testBoard.addCheese(goatCh, {through: {item: 'cheese'}});
        testBoard2.addCheeses([newCheese, goatCh], {through: {item: 'cheese'}});

        //Testing a board can have many cheeses

        const findCheese = await Board.findOne({
            where: {id: 1},
            include:  Cheese,
          
          })
        console.log(findCheese);
        //console.log(findCheese[0].dataValues.Cheeses);
    })
         

    test('Multiple boards can be added to users', async () => {
        await sequelize.sync({ force: true });
        const testUser = await User.create({ name: 'John', email: 'john@example.com' });

        const newBoard = await Board.create({type: 'Oak', description: 'Professor', rating: 5});
        const boardZe = await Board.create({ type: 'ZaZa', description: 'djsakdas', rating: 3});
        const boardZa = await Board.create({ type: 'Birch', description: 'djsaads das', rating: 9});
        await testUser.addBoard(newBoard);
        await testUser.addBoard(boardZe);
        await testUser.addBoard(boardZa);

        const checkingBoards = await User.findAll({include: 'Boards'})
        console.log(checkingBoards[0]);
        console.log(checkingBoards[0].dataValues.Boards);

        expect((await testUser.getBoards())[0].type).toBe('Oak');
        expect(checkingBoards[0].dataValues.Boards[0].type).toBe('Birch');
        expect(checkingBoards[0].dataValues.Boards[1].type).toBe('Oak');
        expect(checkingBoards[0].dataValues.Boards[2].type).toBe('ZaZa');
    })
 
});
