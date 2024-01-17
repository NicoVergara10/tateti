import { useState } from 'react';
import './App.css'
import confetti from 'canvas-confetti';
import { Square } from './components/Square.jsx';
import { TURNS } from './Constant.js';
import { checkWinner, checkEndGame } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null);
  })
  const [turn, setTurn] = useState(() =>{
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X; // los 2 ?? mira si es null o undefined
  });
  const [winner, setWinner] = useState(null); //null es que no hay ganador y false es que hubo empate

  const resetGame = () =>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  const updateBoard = (index) =>{
    if (board[index] || winner) return //si ya tiene un elemento, que no haga mas nada
    const newBoard = [...board]; //los elementos del board los mete en un nuevo array(rest operator)
    newBoard[index] = turn;
    setBoard(newBoard);//desde la constante hasta setBoard, actualizo el tablero.

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; //cambio el turno
    setTurn(newTurn);
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', newTurn);
    const newWinner = checkWinner(newBoard)
      if (newWinner) {
        confetti();
        setWinner(newWinner);
      }else if (checkEndGame(newBoard)){
        setWinner(false);
      }
  }

  return (
    <main className='board'>
      <h1>TA TE TI</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className='game'>
        {
          board.map((square,index) => {
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <section>
         <WinnerModal resetGame={resetGame} winner={winner}/>
      </section>
    </main>
  )
}
export default App

