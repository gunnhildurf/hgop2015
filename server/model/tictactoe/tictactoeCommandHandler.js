module.exports = function tictactoeCommandHandler(events) {

    var tictactoeState = {
        gameCreatedEvent: events[0],
        grid: [["", "", ""], ["", "", ""], ["", "", ""]],
        gameOver: false,
        turn: ""
    }

    var handlers = {
        "CreateGame": function (cmd) {
            {
                var bP;
                if(cmd.player === "X"){
                    bP = "O";
                } else if(cmd.player === "O"){
                    bP = "X";
                }


                return [{
                    id: cmd.id,
                    event: "GameCreated",
                    userName: cmd.userName,
                    gameName: cmd.gameName,
                    aPlayer: cmd.player,
                    bPlayer: bP,
                    timeStamp: cmd.timeStamp
                }];
            }
        },
        "JoinGame": function (cmd) {
            {
                if (!tictactoeState.gameCreatedEvent) {
                    return [{
                        id: cmd.id,
                        event: "GameDoesNotExist",
                        otherUserName: cmd.otherUserName,
                        timeStamp: cmd.timeStamp
                    }];
                }
                if(tictactoeState.gameCreatedEvent.bPlayer==="X"){
                    tictactoeState.turn = cmd.otherUserName;
                } else {
                    tictactoeState.turn = tictactoeState.gameCreatedEvent.userName;
                }

                return [{
                    id: cmd.id,
                    event: "GameJoined",
                    userName: tictactoeState.gameCreatedEvent.userName,
                    otherUserName: cmd.otherUserName,
                    bPlayer: tictactoeState.gameCreatedEvent.bPlayer,
                    turn: tictactoeState.turn,
                    timeStamp: cmd.timeStamp
                }];
            }
        },
        "MakeMove": function (cmd) {

            /*
            //tictactoeState.grid[cmd.row][cmd.column] = mark;
            */
            /*
            var turn = tictactoeState.turn;

            if(cmd.currentPlayer !== turn){
                id:cmd.id,
                event:"IllegalMove",
                currentPlayer: turn,
                nextTurn: "Anna",
                gameWon: false,
                gameDraw: false
            }
            */
            return [{
                id:cmd.id,
                event:"MadeMove",
                currentPlayer: cmd.currentPlayer,
                gameWon: false,
                gameDraw: false
            }];
        }
    };

    return {
        executeCommand: function (cmd) {
            return handlers[cmd.gameCommand](cmd);
        }
    };
};
