## Really, a tic-tac-toe game? Whatcha doin' here?
Just brushing up on React basics by building a simple tic-tac-toe game following the official [React documentation Tutorial](https://reactjs.org/tutorial/tutorial.html), which builds a web app that:
- Allows playing tic-tac-toe,
- Stores the sequence of moves as a game progresses,
- Indicates when a player has won the game,
- Allows players to review a game’s history of moves and see previous versions of the game board.

[Initial game based on the tutorial](https://codepen.io/gaearon/full/gWWZgR)

[My enhanced version of the app](https://gfore.github.io/ReacTacToe/)

As detailed below, I continued well beyond the basic tutorial to build a richly detailed, responsive web app that tracks the history of games played in the browser (using localstorage), including basic data vizualizations that display the results in various chart types. The UI was built using the [Material-UI v4](https://v4.mui.com/) component library and the data viz components use the [Nivo](https://nivo.rocks/) (D3-based) library. The responsiveness of the app, which allows it to display smoothly on any width screen, was done using CSS flexbox for layout and `min()`, `max()`, and `clamp()` for responsive widths and font sizes. Finally, the app was deployed live using Github Pages.

---

## Did ya stop with just the tutorial?
Nope. The tutorial ends with suggestions to make these improvements on your own in order to get more experience with React:
1. ~~Display the location for each move in the move history list.~~ **_[DONE]_**
2. ~~Bold the currently selected item in the move list.~~ **_[DONE]_**
3. ~~Rewrite Board to use two loops to make the squares instead of hardcoding them.~~ **_[DONE]_**
4. ~~Add a toggle button that lets you sort the moves in either ascending or descending order.~~ **_[DONE]_**
5. ~~When someone wins, highlight the three squares that caused the win.~~ **_[DONE]_**
6. ~~When no one wins, display a message about the result being a draw.~~ **_[DONE]_**

---

## So, you're stopping there, right?
Nope - The additional enhancements below will allow me to build more React skills:
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
- ~~Refactor index.js into multiple child component files since it's turned into a hot mess.~~ **_[DONE]_**
- ~~Deploy it live to Github Pages to get practice doing that~~ **_[DONE]_**
- ~~Fix the overflow issue with nivo charts on some mobile devices in Chrome DevTools~~ **_[DONE]_**
- ~~Add the app to my portfolio~~ **_[DONE]_**
- ~~Use localStorage to persist two-player results (assume always the same two people playing) and retreive those results into state when starting the game~~ **_[DONE]_**
- ~~Confirm that browser supports localStorage and handle when it does not~~ **_[DONE]_**
- ~~Allow user to reset saved game results/history in localStorage~~ **_[DONE]_**
- ~~Add a prompt to confirm the user meant to click the clear results button before clearing the results to prevent accidentally losing game history~~ **_[DONE]_**
- ~~Refactor the app to use React Hooks for state management to get more experience using this more recent technique~~ **_[DONE]_**
- ~~Get more experience working with Material-UI styling by refactoring the app to migrate from a single CSS file to CSS in JSX, allowing the styles to be closer to the affected components~~ **_[DONE]_**
- ~~Add a title and favicon~~ **_[DONE]_**
- ~~Improve typography responsiveness using min() and max() techniques for widths, heights, & font sizes were pertinent~~ **_[DONE]_**
- ~~Disable buttons in move list once game is finished~~ **_[DONE]_**
- ~~Improve the mobile UX (e.g., tooltips for buttons only assist laptop/desktop users, so need to make buttons more self-explantory or add labels, and improve layout so it is obvious which player is X and which is O)~~ **_[DONE]_**
- ~~Change color of New Game button when a game ends so it's obvious to user how to start new game~~ **_[DONE]_**
- Migrate FontAwesome icons from JS import and className method to React component version **_[NEXT]_**
- Convert the delete results confirmation message from a generic alert box to a custom dialog modal
- Upgrade the app from React v16 to v18 to get practice doing that type of upgrade and dealing with any breaking changes or new and improved techniques v18 provides

---

## Even more feature possibilities
- Sound effects or other animation when a game ends
- For multi-player game results, be able to see the winning boards (i.e., save a copy of history.squares for the victorious move). Allow pressing a play button to watch all the moves for a past game animated from start to the last move that resulted in a win or tie.
- Have tabs that expand to show Moves and Results. Expand from the side of the board in wide mode or up from the bottom in narrow mode.
- Allow one-player mode for playing against the computer (choose skill levels where 'easy' is just randomly selected, medium attempts to block winning moves, and hard uses strategy to win)
- Deploy to Gatsby/Netlify to get experience with those tools

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


[Process for updating live GitHub Pages site with changes](https://facebook.github.io/create-react-app/docs/deployment#github-pages-https-pagesgithubcom)
(tldr: after committing and pushing latest changes, `npm run deploy` will build the app and push it to GitHub Pages)