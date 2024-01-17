import { WINNER_COMBOS } from "../Constant";
export const checkWinner = (boardToCheck) => {/*revisamos convinaciones ganadoras*/
  for(const combo of WINNER_COMBOS){
    const [a,b,c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  return null;//no hubo ganador
}

export const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square !== null);
}