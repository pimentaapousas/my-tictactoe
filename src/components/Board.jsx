// src/components/Game.jsx
import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  function handlePlay(i) {
    if (winner) return; // impede jogar após vitória
    if (currentSquares[i]) return; // impede sobrescrever

    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleRestart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  let status = "";
  if (winner) {
    status = "🎉 Vencedor: " + winner;
  } else {
    status = "Próximo jogador: " + (xIsNext ? "X" : "O");
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{status}</h2>
      <Board squares={currentSquares} onPlay={handlePlay} />

      <button
        onClick={handleRestart}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Reiniciar jogo
      </button>
    </div>
  );
}

// Função de vitória
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
