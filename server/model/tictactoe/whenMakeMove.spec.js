var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('make move command', function(){

    var given, when, then;

    it('should make move',function(){
        given= [{
            id:"12345",
            event:"GameJoined",
            userName: "Gunnhildur",
            otherUserName: "Anna"
        }];
        when={
            id:"12345",
            gameCommand:"MakeMove",
            row: 0,
            column: 1,
            currentPlayer: "Gunnhildur"
        };
        then=[{
            id:"12345",
            event:"MadeMove",
            currentPlayer: "Gunnhildur",
            gameWon: false,
            gameDraw: false
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
