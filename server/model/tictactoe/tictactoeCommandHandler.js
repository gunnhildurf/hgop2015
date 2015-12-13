var grid = [["", "", ""], ["", "", ""], ["", "", ""]];

module.exports = function tictactoeCommandHandler(events) {

    var tictactoeState = {
        gameCreatedEvent: events[0],
        //grid: [["", "", ""], ["", "", ""], ["", "", ""]],
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

            if(grid[cmd.row][cmd.column] !== ""){
                return [{
                    id:cmd.id,
                    event:"IllegalMove",
                    moveRow: cmd.row,
                    moveColumn: cmd.column,
                    nextPlayer: cmd.currentPlayer,
                    gameWon: false,
                    gameDraw: false
                }];
            }




            if(cmd.currentPlayer === tictactoeState.gameCreatedEvent.userName && tictactoeState.gameCreatedEvent.aPlayer === "X"){
                grid[cmd.row][cmd.column] = "X";
            }
            else if(cmd.currentPlayer === tictactoeState.gameCreatedEvent.userName && tictactoeState.gameCreatedEvent.aPlayer === "O"){
                grid[cmd.row][cmd.column] = "O";
            }
            else if(cmd.currentPlayer !== tictactoeState.gameCreatedEvent.userName && tictactoeState.gameCreatedEvent.bPlayer === "X"){
                grid[cmd.row][cmd.column] = "X";
            }
            else if(cmd.currentPlayer !== tictactoeState.gameCreatedEvent.userName && tictactoeState.gameCreatedEvent.bPlayer === "O"){
                grid[cmd.row][cmd.column] = "O";
            }


            tictactoeState.turn = cmd.nextPlayer;


            return [{
                id:cmd.id,
                event:"MadeMove",
                moveRow: cmd.row,
                moveColumn: cmd.column,
                nextPlayer: tictactoeState.turn,
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
