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
         await sequelize.sync({ force: true });
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

    test('can create a Boardd', async () => {
        // TODO - test creating a board
        const testBoard = await Board.create({ type: 'Bamboo', description: "10 year old Bamboo from Japan", rating: 7 });
        expect(testBoard.type).toBe('Bamboo');
        expect(testBoard.description).toBe('10 year old Bamboo from Japan');
        expect(testBoard.rating).toBe(7);
        expect(testBoard.id).toBe(1);
    })
 
});