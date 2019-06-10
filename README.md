## Really, dude, a tic-tac-toe game? Whatcha doin' here?
Oh, just brushing up on React basics by building a simple tic-tac-toe game following the official [React documentation Tutorial](https://reactjs.org/tutorial/tutorial.html). This builds a web app that:
- Lets you play tic-tac-toe,
- Indicates when a player has won the game,
- Stores a game’s history as a game progresses,
- Allows players to review a game’s history and see previous versions of a game’s board.

The completed tutorial project can be seen at this [CodePen](https://codepen.io/gaearon/full/gWWZgR).

---

## Yeah, what else?
Upon completion of the basic follow-along tutorial, these improvements are suggested as challenges to complete on your own, in order of increasing difficulty:
1. ~~Display the location for each move in the move history list.~~ **_[DONE]_**
2. ~~Bold the currently selected item in the move list.~~ **_[DONE]_**
3. ~~Rewrite Board to use two loops to make the squares instead of hardcoding them.~~ **_[DONE]_**
4. ~~Add a toggle button that lets you sort the moves in either ascending or descending order.~~ **_[DONE]_**
5. ~~When someone wins, highlight the three squares that caused the win.~~ **_[DONE]_**
6. ~~When no one wins, display a message about the result being a draw.~~ **_[DONE]_**

---

## You're not stopping there are ya?
Nope - Additional enhancements I could try:
- ~~Reset button~~ **_[DONE]_**
- ~~Add media queries to make it responsive~~ **_[DONE]_**
- ~~Allow tracking multiple game results between two players~~ **_[DONE]_**
- ~~Change move list hover to highlight in the color specific to player 1 or player 2. When player wins (or ties), the highlight of the winning line should be the player's color.~~ **_[DONE]_**
- ~~Highlight the whole board for a tie~~ **_[DONE]_**
- ~~Reorganize wide-mode layout so buttons and status are in column with move list.~~  **_[DONE]_**
- ~~Use a data viz library (eg., nivo) to display a live pie, bar, or line chart showing player 1 wins, player 2 wins, and ties. (Line chart has number of games as x-axis, or save a timestamp with each game to use time as x-axis). Allow user to switch between chart type.~~ **_[DONE]_**
- ~~Add icon buttons for switching between chart types instead of radio input buttons.~~ **_[DONE]_**
- ~~Fix the responsiveness of charts in mobile mode and improve look of player to letter assignment info.~~ **_[DONE]_**
- ~~Move Game Status above the board and move buttons to a sticky footer when in mobile mode.~~ **_[DONE]_**
- ~~Refactor index.js into multiple child component files since it's turned into a hot mess.~~ **_[DONE]_** (Could simplify further and make it cleaner, but ready to move on to other things)
- ~~Deploy it live to Github Pages to get practice doing that~~ **_[DONE]_**
- Disable buttons in move list once game is finished
- Fix the overflow issue with nivo charts on some mobile devices in Chrome DevTools
- Sound effects or other animation when a game ends
- ~~Add the app to my portfolio~~ **_[DONE]_**
- Implement rem units instead of using px so fonts stay proportional (and to get practice using this more modern technique)
- ~~Use localStorage to persist two-player results (assume always the same two people playing) and retreive those results into state when starting the game~~ **_[DONE]_**
- ~~Confirm that browser supports localStorage and handle when it does not~~ **_[DONE]_**
- Allow user to reset saved game results/history in localStorage and handle case where user device does not support localStorage

---

## Stretch feature additions
- For multi-player game results, be able to see the winning boards (i.e., save a copy of history.squares for the victorius move). Allow pressing a play button to watch all the moves for a past game animated from start to the last move that resulted in a win or tie.
- Have tabs that expand to show Moves and Results. Expand from the side of the board in wide mode or up from the bottom in narrow mode.
- Allow one-player mode for playing against the computer (choose skill levels where 'easy' is just randomly selected, medium attempts to block winning moves, and hard uses strategy to win)
- Deploy to Gatsby/Netlify to get experience with those tools

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


[Process for updating live GitHub Pages site with changes](https://facebook.github.io/create-react-app/docs/deployment#github-pages-https-pagesgithubcom)
