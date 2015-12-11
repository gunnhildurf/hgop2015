module.exports = function tictactoeCommandHandler(events) {

    var tictactoeState = {
        gameCreatedEvent: events[0],
        grid: [["", "", ""], ["", "", ""], ["", "", ""]]
    }

  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          event: "GameCreated",
          userName: cmd.userName,
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
          userName: cmd.userName,
          otherUserName: tictactoeState.gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    }
  };

  return {
    executeCommand: function (cmd) {
      return handlers[cmd.comm](cmd);
    }
  };
};
