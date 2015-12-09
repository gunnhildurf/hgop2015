Given[Placed(0,0,X), Placed(1,0,X)]
When[Place(2,0,X)]
Then[X wins]

Given[Placed(0,0,O), Placed(1,1,O)]
When[Place(2,2,O)]
Then[O wins]

Given[Placed(1,2,X), Placed(1,1,X)]
When[Place(1,0,X)]
Then[X wins]

Given[IsFullBoard()]
When[PlacedMove(X)]
Then[Draw]

Given[GameCreated()]
When[O joined]
Then[ClosePlayers()]

Given[TookTurn(X)]
When[MakesMove(X)]
Then[Throw IllegalMoveError]

Given[!GameStarted()]//X has made first move
When[MakesMove(O)]
Then[Throw IllegalMoveError]
