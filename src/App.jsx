import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./Combination.js";
import GameOver from "./components/GameOver.jsx";
import {useState} from 'react';
const PLAYERS = {
  X : 'palyer 1',
  O : 'palyer 2',
}
const initialGameBoard = [
  [null, null,null],
  [null, null,null],
  [null, null,null],
];

function deriveActivePlayer(gameTruns){
  let currentPlayer = 'X';

  if (gameTruns.length > 0 && gameTruns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
};
function driveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array=> [...array])];
  for (const turn of gameTurns){
    const {square,player} = turn;
    const {row,col} = square;
    gameBoard[row][col] = player;
  };
  return gameBoard;
};
function driveWinner(gameBoard,players){
  let winner;
  
  for (const combiation of WINNING_COMBINATIONS){
    const fristSquareSymbol = gameBoard[combiation[0].row][combiation[0].column];
    const secondSquareSymbol = gameBoard[combiation[1].row][combiation[1].column];
    const thirdSquareSymbole = gameBoard[combiation[2].row][combiation[2].column];
    if(fristSquareSymbol && 
      fristSquareSymbol === secondSquareSymbol && 
      secondSquareSymbol === thirdSquareSymbole){
        winner = players[fristSquareSymbol];
     }
  }
  return winner;
}

function App() {
  const [players,setPlayers] = useState(PLAYERS);
  const [gameTurns,setGameTurns] = useState([]);
  const hasDraw = gameTurns.length === 9 && !winner;
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = driveGameBoard(gameTurns);
  const winner = driveWinner(gameBoard,players);
  function handlerRestart(){
    setGameTurns([]);
  }

  function handlerSelectSquare(rowIndex,colIndex){
    setGameTurns((prevTurns)=>{
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        {square:{row:rowIndex,col:colIndex},player:currentPlayer},
        ...prevTurns,
      ];
      return updateTurns;
    });
  }
  function handlerChangeName(symbol,newName){
    setPlayers(prevPlayer => {
      return{
        ...prevPlayer,
        [symbol] : newName
      };
    });
  }
  
  return (

   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player 
        initialName={PLAYERS.X} 
        symbol="X"
        isActive={activePlayer === 'X'}
        onChangeName={handlerChangeName}
        />
        <Player 
        initialName={PLAYERS.O}
        symbol="O"
        isActive={activePlayer === 'O'}
        onChangeName={handlerChangeName}
        />
      </ol>
      {(winner || hasDraw) && <GameOver 
      winner={winner} 
      onRestart={handlerRestart}
      />}
      <GameBoard 
      onSelectSquare={handlerSelectSquare}
      board ={gameBoard}
      />
    </div>
    <Log turns={gameTurns}/>
   </main>
  )
}

export default App
