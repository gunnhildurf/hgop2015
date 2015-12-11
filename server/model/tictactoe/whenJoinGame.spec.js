var tictactoeCommandHandler = require('./tictactoeCommandHandler');


describe('join game command', function(){

    var given, when, then;

    it('should join game',function(){
        given= [{
            id:"1234",
            event:"GameCreated",
            userName: "Gulli",
            player: "X",
            timeStamp: "2015.12.02T11:29:44"
        }];
        when={
            id:"12345",
            gameCommand:"JoinGame",
            userName : "Halli",
            name:"TheFirstGame",
            timeStamp: "2015.12.02T11:30:50"
        };
        then=[{
            id:"12345",
            event:"GameJoined",
            userName: "Gulli",
            otherUserName: "Halli",
            bPlayer: "O",
            timeStamp: "2015.12.02T11:30:50"
        }];


        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });

  it('should reject joining of a non-existing game',function(){
        given= [];
        when={
            id:"12345",
            gameCommand:"JoinGame",
            userName : "Halli",
            name:"TheFirstGame",
            timeStamp: "2015.12.02T11:30:55"
        };
        then=[{
            id:"12345",
            event:"GameDoesNotExist",
            userName: "Halli",
            timeStamp: "2015.12.02T11:30:55"
        }];

        var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

        JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
});
