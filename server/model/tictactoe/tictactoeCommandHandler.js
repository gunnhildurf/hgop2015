
module.exports = function tictactoeCommandHandler(events) {

    var tictactoeState = {
        grid: [["", "", ""], ["", "", ""], ["", "", ""]],
        turn: ""
    }

    var gameCreatedEvent = events[0];

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
                if (!gameCreatedEvent) {
                    return [{
                        id: cmd.id,
                        event: "GameDoesNotExist",
                        otherUserName: cmd.otherUserName,
                        timeStamp: cmd.timeStamp
                    }];
                }
                if(gameCreatedEvent.bPlayer==="X"){
                    tictactoeState.turn = cmd.otherUserName;
                } else {
                    tictactoeState.turn = gameCreatedEvent.userName;
                }

                return [{
                    id: cmd.id,
                    event: "GameJoined",
                    userName: gameCreatedEvent.userName,
                    otherUserName: cmd.otherUserName,
                    bPlayer: gameCreatedEvent.bPlayer,
                    turn: tictactoeState.turn,
                    timeStamp: cmd.timeStamp
                }];
            }
        },
        "MakeMove": function (cmd) {

            var secondUser = "";
            var mark = "";
            var next = "";

            //set up test premise
            for(var i = 0; i < events.length; i = i + 1){

                if(events[i].event === "GameJoined"){
                    tictactoeState.turn = events[i].turn;
                    secondUser = events[i].otherUserName;
                }

                if(events[i].event === "MadeMove"){
                    tictactoeState.grid[events[i].moveRow][events[i].moveColumn] = events[i].mark;
                    tictactoeState.turn = events[i].nextPlayer;
                }

            }

            //detect if square is already taken
            if(tictactoeState.grid[cmd.row][cmd.column] !== ""){
                return [{
                    id:cmd.id,
                    event:"IllegalMove",
                    moveRow: cmd.row,
                    moveColumn: cmd.column,
                    player: cmd.currentPlayer,
                    nextPlayer: cmd.currentPlayer
                }];
            }

            //check if move is out of turn
            if(tictactoeState.turn !== cmd.currentPlayer){
                return [{
                    id:cmd.id,
                    event:"IllegalMove",
                    moveRow: cmd.row,
                    moveColumn: cmd.column,
                    player: cmd.currentPlayer,
                    nextPlayer: tictactoeState.turn
                }];
            }

            //set up valid move
            if(cmd.currentPlayer === gameCreatedEvent.userName && gameCreatedEvent.aPlayer === "X"){
                tictactoeState.grid[cmd.row][cmd.column] = "X";
                mark = "X";
                next = secondUser;
            }
            else if(cmd.currentPlayer === gameCreatedEvent.userName && gameCreatedEvent.aPlayer === "O"){
                tictactoeState.grid[cmd.row][cmd.column] = "O";
                mark = "O";
                next = secondUser;
            }
            else if(cmd.currentPlayer !== gameCreatedEvent.userName && gameCreatedEvent.bPlayer === "X"){
                tictactoeState.grid[cmd.row][cmd.column] = "X";
                mark = "X";
                next = gameCreatedEvent.userName;
            }
            else if(cmd.currentPlayer !== gameCreatedEvent.userName && gameCreatedEvent.bPlayer === "O"){
                tictactoeState.grid[cmd.row][cmd.column] = "O";
                mark = "O";
                next = gameCreatedEvent.userName;
            }

            //detect if game has been won
            if(readVertical(tictactoeState.grid) || readHorizontal(tictactoeState.grid) || readDiagonal(tictactoeState.grid)){
                return[{
                    id: cmd.id,
                    event: "GameWon",
                    moveRow: cmd.row,
                    moveColumn: cmd.column,
                    player: cmd.currentPlayer,
                    nextPlayer: ""
                }];
            }

            //detect draw situation
            if(readIfFullGrid(tictactoeState.grid)){
                return [{
                    id: cmd.id,
                    event:"GameDraw",
                    moveRow: cmd.row,
                    moveColumn: cmd.column,
                    player: cmd.currentPlayer,
                    nextPlayer: ""
                }]
            }

            //return valid move that does not end game
            return [{
                id:cmd.id,
                event:"MadeMove",
                moveRow: cmd.row,
                moveColumn: cmd.column,
                mark: mark,
                player: cmd.currentPlayer,
                nextPlayer: next
            }];
        }
    };

    return {
        executeCommand: function (cmd) {
            return handlers[cmd.gameCommand](cmd);
        }
    };
};

////////////////////////////* HELPER FUNCTIONS */////////////////////////////////////////

function readVertical(grid) {
    for(var i = 0; i <= 2; i++){
        if(grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i] && grid[0][i] !== ""){
            return true;
        }
    }
    return false;
}

function readHorizontal(grid) {
    for(var i = 0; i <= 2; i++){
        if(grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2] && grid[i][0] !== ""){
            return true;
        }
    }
    return false;
}

function readDiagonal(grid) {
    if(grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2] && grid[1][1] !== ""){
        return true;
    } else if (grid[2][0] === grid[1][1] && grid[1][1] === grid[0][2] && grid[1][1] !== "") {
        return true;
    }
    return false;
}

function readIfFullGrid(grid) {
    for(var i = 0; i <= 2; i++){
        for(var j = 0; j <= 2; j++){
            if(grid[i][j] === ""){
                return false;
            }
        }
    }
    return true;
}
