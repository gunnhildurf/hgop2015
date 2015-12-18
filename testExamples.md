//Create game
Given[]

When[CreateGame]

Then[GameCreated]

//Join game

Given[GameCreated]

When[JoinGame(userName)]

Then[JoinedGame(userName)]


Given[Placed(0,0,X), Placed(1,1,X)]
When[Place(2,2,X)]
Then[X wins]

Given[Placed(1,2,X), Placed(1,1,X)]
When[Place(1,0,X)]
Then[X wins]

Given[IsFullBoard()]
When[PlacedMove(X)]
Then[Draw]

Given[GameCreated()]
When[O joined]
Then[ClosePlayers()]

Given[MadeMoveinX,Y]
When[MakeMoveinX,Y]
Then[IllegalMove]
