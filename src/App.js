import React, {useState} from 'react';
import './App.css';
import Grid from './Grid'

const rows = 25;
const columns = 25;

const randomValue = () => {
  return Math.random() < 0.3
}

const newBoard = () => {
  const grid = [];
  for (let r = 0; r < rows; r++) {
      grid[r] = [];
      for (let c = 0; c < columns; c++) {
          grid[r][c] = randomValue();
      }
  }
  return grid;
};

function App() {
  const [board, setBoard] = useState(newBoard)

  return (
    <div>
      <h1>Game Of Life</h1>
      <div className="container">
        <Grid board={board} />
      </div>
    </div>
  );
}

export default App;
