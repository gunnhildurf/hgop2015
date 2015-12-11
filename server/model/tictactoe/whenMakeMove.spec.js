var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('make move command', function(){

    var given, when, then;

    it('should make first move',function(){
        given= [{
            id:"12345",
            event:"GameJoined",
            userName: "Gulli",
            otherUserName: "Halli"
        }];
        when={
            id:"12345",
            gameCommand:"MakeMove",
            row: 0,
            column: 1,
            currentPlayer: "Gulli"
        };
        then=[{
            id:"12345",
            event:"MadeMoveX",
            currentPlayer: "Gulli",
            nextTurn: "Halli",
            gameWon: false,
            gameDraw: false
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
