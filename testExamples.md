###Test examples

####Create game

Given[]

When[CreateGame]

Then[GameCreated]


####Join game

Given[GameCreated]

When[JoinGame(userName)]

Then[JoinedGame(userName)]


####Diagonal win

Given[Placed(0,0,X), Placed(1,1,X)]

When[Place(2,2,X)]

Then[X wins]


####Horizontal win

Given[GameCreated], [JoinedGame], [Placed(1,2,X), Placed(1,1,X)]

When[Place(1,0,X)]

Then[X wins]

####Draw

Given[GameCreated], [JoinedGame], [PlacedMove(X)]

When[IsFullBoard()]

Then[Draw]

####No two moves in one square

Given[GameCreated], [JoinedGame], [MadeMoveinX,Y]

When[MakeMoveinX,Y]

Then[IllegalMove]
