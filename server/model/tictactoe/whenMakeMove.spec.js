var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('make move command', function(){

    var given, when, then;

    it('should make move',function(){
        given= [{
            id:"12347",
            gameId: "4",
            event:"GameCreated",
            userName: "Gunnhildur",
            gameName:"TheSecondGame",
            aPlayer: "X",
            bPlayer: "O",
            timeStamp: "2015.12.02T10:29:44"
        },{
            id:"12347",
            gameId: "4",
            event:"GameJoined",
            userName: "Gunnhildur",
            otherUserName: "Anna",
            bPlayer: "O",
            turn: "Gunnhildur",
            timeStamp: "2015.12.02T11:31:50"
        }];
        when={
            id:"12347",
            gameId: "4",
            gameCommand:"MakeMove",
            row: 0,
            column: 1,
            currentPlayer: "Gunnhildur",
            nextPlayer: "Anna"
        };
        then=[{
            id:"12347",
            gameId: "4",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 1,
            mark: "X",
            player: "Gunnhildur",
            nextPlayer: "Anna",
        }];



        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
    it('should not let player move out of turn',function(){
        given= [{
            id:"12348",
            gameId: "7",
            event:"GameCreated",
            userName: "Anna",
            gameName:"HulaHoop",
            aPlayer: "X",
            bPlayer: "O",
            timeStamp: "2015.12.02T10:29:44"
        },{
            id:"12348",
            gameId: "7",
            event:"GameJoined",
            userName: "Anna",
            otherUserName: "Gunnhildur",
            bPlayer: "O",
            turn: "Anna",
            timeStamp: "2015.12.02T11:31:50"
        }];
        when={
            id:"12348",
            gameId: "7",
            gameCommand:"MakeMove",
            row: 0,
            column: 2,
            currentPlayer: "Gunnhildur",
            nextPlayer: "Anna"
        };
        then=[{
            id:"12348",
            gameId: "7",
            event:"IllegalMove",
            moveRow: 0,
            moveColumn: 2,
            player: "Gunnhildur",
            nextPlayer: "Anna"
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
    it('should not allow two moves in same place',function(){
        given= [{
            id:"12349",
            gameId: "8",
            event:"GameCreated",
            userName: "Anna",
            gameName:"Wally",
            aPlayer: "X",
            bPlayer: "O",
            timeStamp: "2015.12.02T10:29:44"
        },{
            id:"12349",
            gameId: "8",
            event:"GameJoined",
            userName: "Anna",
            otherUserName: "Gunnhildur",
            bPlayer: "O",
            turn: "Anna",
            timeStamp: "2015.12.02T11:31:50"
        },{
            id:"12349",
            gameId: "8",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 1,
            mark: "X",
            player: "Anna",
            nextPlayer: "Gunnhildur"}];
        when={
            id:"12349",
            gameId: "8",
            gameCommand:"MakeMove",
            row: 0,
            column: 1,
            currentPlayer: "Gunnhildur",
            nextPlayer: "Anna"
        };
        then=[{
            id:"12349",
            gameId: "8",
            event:"IllegalMove",
            moveRow: 0,
            moveColumn: 1,
            player: "Gunnhildur",
            nextPlayer: "Gunnhildur"
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
    it('should detect vertical victory',function(){
        given= [{
            id:"54321",
            gameId: "9",
            event:"GameCreated",
            userName: "Moby",
            gameName:"Bob",
            aPlayer: "X",
            bPlayer: "O",
            timeStamp: "2015.12.02T10:29:44"
        },{
            id:"54321",
            gameId: "9",
            event:"GameJoined",
            userName: "Moby",
            otherUserName: "Dick",
            bPlayer: "O",
            turn: "Moby",
            timeStamp: "2015.12.02T11:31:50"
        },{
            id:"54321",
            gameId: "9",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 1,
            mark: "X",
            player: "Moby",
            nextPlayer: "Dick"
        },{
            id:"54321",
            gameId: "9",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 0,
            mark: "O",
            player: "Dick",
            nextPlayer: "Moby"
        },{
            id:"54321",
            gameId: "9",
            event:"MadeMove",
            moveRow: 1,
            moveColumn: 1,
            mark: "X",
            player: "Moby",
            nextPlayer: "Dick"
        },{
            id:"54321",
            gameId: "9",
            event:"MadeMove",
            moveRow: 1,
            moveColumn: 0,
            mark: "O",
            player: "Dick",
            nextPlayer: "Moby"}];
        when={
            id:"54321",
            gameId: "9",
            gameCommand:"MakeMove",
            row: 2,
            column: 1,
            currentPlayer: "Moby",
            nextPlayer: "Dick"
        };
        then=[{
            id:"54321",
            gameId: "9",
            event:"GameWon",
            moveRow: 2,
            moveColumn: 1,
            player: "Moby",
            nextPlayer: ""
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
    it('should detect horizontal victory',function(){
        given= [{
            id:"543210",
            gameId: "10",
            event:"GameCreated",
            userName: "Alice",
            gameName:"tictactoeOlympics",
            aPlayer: "O",
            bPlayer: "X",
            timeStamp: "2015.12.02T10:29:44"
        },{
            id:"543210",
            gameId: "10",
            event:"GameJoined",
            userName: "Alice",
            otherUserName: "Bob",
            bPlayer: "X",
            turn: "Bob",
            timeStamp: "2015.12.02T11:31:50"
        },{
            id:"543210",
            gameId: "10",
            event:"MadeMove",
            moveRow: 2,
            moveColumn: 1,
            mark: "X",
            player: "Bob",
            nextPlayer: "Alice"
        },{
            id:"543210",
            gameId: "10",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 0,
            mark: "O",
            player: "Alice",
            nextPlayer: "Bob"
        },{
            id:"543210",
            gameId: "10",
            event:"MadeMove",
            moveRow: 1,
            moveColumn: 0,
            mark: "X",
            player: "Bob",
            nextPlayer: "Alice"
        },{
            id:"543210",
            gameId: "10",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 1,
            mark: "O",
            player: "Alice",
            nextPlayer: "Bob"
        },{
            id:"543210",
            gameId: "10",
            event:"MadeMove",
            moveRow: 2,
            moveColumn: 0,
            mark: "X",
            player: "Bob",
            nextPlayer: "Alice"}];
        when={
            id:"543210",
            gameId: "10",
            gameCommand:"MakeMove",
            row: 0,
            column: 2,
            currentPlayer: "Alice",
            nextPlayer: "Bob"
        };
        then=[{
            id:"543210",
            gameId: "10",
            event:"GameWon",
            moveRow: 0,
            moveColumn: 2,
            player: "Alice",
            nextPlayer: ""
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
    it('should detect diagonal victory',function(){
        given= [{
            id:"90210",
            gameId: "11",
            event:"GameCreated",
            userName: "Tom",
            gameName:"tictactoeWorldCupFinal",
            aPlayer: "X",
            bPlayer: "O",
            timeStamp: "2015.12.02T10:29:43"
        },{
            id:"90210",
            gameId: "11",
            event:"GameJoined",
            userName: "Tom",
            otherUserName: "Jerry",
            bPlayer: "O",
            turn: "Tom",
            timeStamp: "2015.12.02T11:31:50"
        },{
            id:"90210",
            gameId: "11",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 0,
            mark: "X",
            player: "Tom",
            nextPlayer: "Jerry"
        },{
            id:"90210",
            gameId: "11",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 1,
            mark: "O",
            player: "Jerry",
            nextPlayer: "Tom"
        },{
            id:"90210",
            gameId: "11",
            event:"MadeMove",
            moveRow: 1,
            moveColumn: 1,
            mark: "X",
            player: "Tom",
            nextPlayer: "Jerry"
        },{
            id:"90210",
            gameId: "11",
            event:"MadeMove",
            moveRow: 2,
            moveColumn: 1,
            mark: "O",
            player: "Jerry",
            nextPlayer: "Tom"
        }];
        when={
            id:"90210",
            gameId: "11",
            gameCommand:"MakeMove",
            row: 2,
            column: 2,
            currentPlayer: "Tom",
            nextPlayer: "Jerry"
        };
        then=[{
            id:"90210",
            gameId: "11",
            event:"GameWon",
            moveRow: 2,
            moveColumn: 2,
            player: "Tom",
            nextPlayer: ""
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
    it('should detect draw',function(){
        given= [{
            id:"555",
            gameId: "12",
            event:"GameCreated",
            userName: "Bey",
            gameName:"TourDeTictactoe",
            aPlayer: "X",
            bPlayer: "O",
            timeStamp: "2015.12.02T10:29:43"
        },{
            id:"555",
            gameId: "12",
            event:"GameJoined",
            userName: "Bey",
            otherUserName: "Jay",
            bPlayer: "O",
            turn: "Bey",
            timeStamp: "2015.12.02T11:31:51"
        },{
            id:"555",
            gameId: "12",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 0,
            mark: "X",
            player: "Bey",
            nextPlayer: "Jay"
        },{
            id:"555",
            gameId: "12",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 1,
            mark: "O",
            player: "Jay",
            nextPlayer: "Bey"
        },{
            id:"555",
            gameId: "12",
            event:"MadeMove",
            moveRow: 1,
            moveColumn: 0,
            mark: "X",
            player: "Bey",
            nextPlayer: "Jay"
        },{
            id:"555",
            gameId: "12",
            event:"MadeMove",
            moveRow: 2,
            moveColumn: 0,
            mark: "O",
            player: "Jay",
            nextPlayer: "Bey"
        },{
            id:"555",
            gameId: "12",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 2,
            mark: "X",
            player: "Bey",
            nextPlayer: "Jay"
        },{
            id:"555",
            gameId: "12",
            event:"MadeMove",
            moveRow: 1,
            moveColumn: 1,
            mark: "O",
            player: "Jay",
            nextPlayer: "Bey"
        },{
            id:"555",
            gameId: "12",
            event:"MadeMove",
            moveRow: 2,
            moveColumn: 1,
            mark: "X",
            player: "Bey",
            nextPlayer: "Jay"
        },{
            id:"555",
            gameId: "12",
            event:"MadeMove",
            moveRow: 2,
            moveColumn: 2,
            mark: "O",
            player: "Jay",
            nextPlayer: "Bey"
        }];
        when={
            id:"555",
            gameId: "12",
            gameCommand:"MakeMove",
            row: 1,
            column: 2,
            currentPlayer: "Bey",
            nextPlayer: "Jay"
        };
        then=[{
            id:"555",
            gameId: "12",
            event:"GameDraw",
            moveRow: 1,
            moveColumn: 2,
            player: "Bey",
            nextPlayer: ""
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
