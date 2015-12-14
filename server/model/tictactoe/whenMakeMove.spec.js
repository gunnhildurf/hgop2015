var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('make move command', function(){

    var given, when, then;

    it('should make move',function(){
        given= [{
            id:"12347",
            event:"GameCreated",
            userName: "Gunnhildur",
            gameName:"TheSecondGame",
            aPlayer: "X",
            bPlayer: "O",
            timeStamp: "2015.12.02T10:29:44"
        },{
            id:"12347",
            event:"GameJoined",
            userName: "Gunnhildur",
            otherUserName: "Anna",
            bPlayer: "O",
            turn: "Gunnhildur",
            timeStamp: "2015.12.02T11:31:50"
        }];
        when={
            id:"12347",
            gameCommand:"MakeMove",
            row: 0,
            column: 1,
            currentPlayer: "Gunnhildur",
            nextPlayer: "Anna"
        };
        then=[{
            id:"12347",
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
            event:"GameCreated",
            userName: "Anna",
            gameName:"HulaHoop",
            aPlayer: "X",
            bPlayer: "O",
            timeStamp: "2015.12.02T10:29:44"
        },{
            id:"12348",
            event:"GameJoined",
            userName: "Anna",
            otherUserName: "Gunnhildur",
            bPlayer: "O",
            turn: "Anna",
            timeStamp: "2015.12.02T11:31:50"
        }];
        when={
            id:"12348",
            gameCommand:"MakeMove",
            row: 0,
            column: 2,
            currentPlayer: "Gunnhildur",
            nextPlayer: "Anna"
        };
        then=[{
            id:"12348",
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
            event:"GameCreated",
            userName: "Anna",
            gameName:"Wally",
            aPlayer: "X",
            bPlayer: "O",
            timeStamp: "2015.12.02T10:29:44"
        },{
            id:"12349",
            event:"GameJoined",
            userName: "Anna",
            otherUserName: "Gunnhildur",
            bPlayer: "O",
            turn: "Anna",
            timeStamp: "2015.12.02T11:31:50"
        },{
            id:"12349",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 1,
            mark: "X",
            player: "Anna",
            nextPlayer: "Gunnhildur"}];
        when={
            id:"12349",
            gameCommand:"MakeMove",
            row: 0,
            column: 1,
            currentPlayer: "Gunnhildur",
            nextPlayer: "Anna"
        };
        then=[{
            id:"12349",
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
            event:"GameCreated",
            userName: "Moby",
            gameName:"Bob",
            aPlayer: "X",
            bPlayer: "O",
            timeStamp: "2015.12.02T10:29:44"
        },{
            id:"54321",
            event:"GameJoined",
            userName: "Moby",
            otherUserName: "Dick",
            bPlayer: "O",
            turn: "Moby",
            timeStamp: "2015.12.02T11:31:50"
        },{
            id:"54321",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 1,
            mark: "X",
            player: "Moby",
            nextPlayer: "Dick"
        },{
            id:"54321",
            event:"MadeMove",
            moveRow: 0,
            moveColumn: 0,
            mark: "O",
            player: "Dick",
            nextPlayer: "Moby"
        },{
            id:"54321",
            event:"MadeMove",
            moveRow: 1,
            moveColumn: 1,
            mark: "X",
            player: "Moby",
            nextPlayer: "Dick"
        },{
            id:"54321",
            event:"MadeMove",
            moveRow: 1,
            moveColumn: 0,
            mark: "O",
            player: "Dick",
            nextPlayer: "Moby"}];
        when={
            id:"54321",
            gameCommand:"MakeMove",
            row: 2,
            column: 1,
            currentPlayer: "Moby",
            nextPlayer: "Dick"
        };
        then=[{
            id:"54321",
            event:"GameWon",
            moveRow: 2,
            moveColumn: 1,
            player: "Moby",
            nextPlayer: ""
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

});
