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
            gameWon: false,
            gameDraw: false
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
            gameWon: false,
            gameDraw: false
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
            nextPlayer: "Gunnhildur",
            gameWon: false,
            gameDraw: false}];
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
            nextPlayer: "Anna",
            gameWon: false,
            gameDraw: false
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);


        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
