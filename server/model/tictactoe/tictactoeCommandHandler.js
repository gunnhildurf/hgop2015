module.exports = function tictactoeCommandHandler(events) {

    var tictactoeState = {
        gameCreatedEvent: events[0],
        grid: [["", "", ""], ["", "", ""], ["", "", ""]],
        gameOver: false
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
                        userName: cmd.userName,
                        timeStamp: cmd.timeStamp
                    }];
                }
                return [{
                    id: cmd.id,
                    event: "GameJoined",
                    userName: tictactoeState.gameCreatedEvent.userName,
                    otherUserName: cmd.userName,
                    bPlayer: "O", //should not be hardcoded!
                    timeStamp: cmd.timeStamp
                }];
            }
        },
        "MakeMove": function (cmd) {
            var next = "";
            //var mark = "";

            if(cmd.currentPlayer === tictactoeState.gameCreatedEvent.userName) {
                next = tictactoeState.gameCreatedEvent.otherUserName;
                //mark = "X"
            } else {
                next = tictactoeState.gameCreatedEvent.userName;
                //mark = "O"
            }
            //tictactoeState.grid[cmd.row][cmd.column] = mark;

            return [{
                id: cmd.id,
                event: "MadeMoveX",
                currentPlayer: cmd.currentPlayer,
                nextTurn: next,
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
