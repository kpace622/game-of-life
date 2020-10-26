import React, {useState, useCallback, useRef} from 'react';
import './App.css';
import produce from 'immer';
import { resetGrid, randomizeGrid, countNeighbors } from './functions';

const initialValues = {
  rows: 25,
  columns: 25,
}

const App = () => {
  const [grid, setGrid] = useState(() => resetGrid());

  const [formValue, setFormValue] = useState(initialValues)
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  const numRows = formValue.rows;
  const numCols = formValue.columns;
  const speed = 500;

  const handleChange = e => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value})
  }

  const runningRef = useRef(running);
  runningRef.current = running;

  const generationRef = useRef(generation);
  generationRef.current = generation;

  const runSimulation = useCallback(() => {
    setInterval(() => {
      if (!runningRef.current) {
        return;
      }

      setGrid((currentGrid) =>
        produce(currentGrid, (gridCopy) => {
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              const count = countNeighbors(currentGrid, i, j);
              if (currentGrid[i][j] === 1 && (count < 2 || count > 3))
                gridCopy[i][j] = 0;
              if (!currentGrid[i][j] && count === 3) gridCopy[i][j] = 1;
            }
          }
        }),
      );
      setGeneration(++generationRef.current);
    }, speed);
  }, []);

  return (
    <>
      <h1>Game of Life</h1>
      <div className='container'>
        <section className='container'
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numCols}, 20px)`,
          }}
        >
          {grid.map((rows, rowIdx) =>
            rows.map((col, colIdx) => (
              <div className={grid[rowIdx][colIdx] ? 'alive' : 'dead'}
                key={`${rowIdx}-${colIdx}`}
                onClick={() => {
                  const newGrid = produce(grid, (gridCopy) => {
                    gridCopy[rowIdx][colIdx] = grid[rowIdx][colIdx] ? 0 : 1;
                  });
                  setGrid(newGrid);
                }}
              />
            )),
          )}
        </section>
           
        <section>
          <h2>Rules</h2> 
          <ul>
             <li>Any live cell with two or three live neighbours survives</li>
             <li>Any dead cell with three live neighbours becomes a live cell</li>
             <li>All other live cells die in the next genereation. </li>
             <li>All other dead cells stay dead</li>
           </ul>
        </section>
      </div>
      <button
        onClick={() => {
          setRunning(!running);
          runningRef.current = !running;
          if (!running) {
            runSimulation();
          }
        }}
      >
        {!running ? 'Start' : 'Stop'}
      </button>
      <button
        onClick={() => {
          setGrid(resetGrid());
          setGeneration(0);
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          setGrid(randomizeGrid());
        }}
      >
        Randomize
      </button>
      <p>Generation: {generation}</p>
      <form>
        <label for='rows'>Change number of rows: </label>
        <input type='text' value={formValue.rows} name='rows' onChange={handleChange} />
        <br/>
        <br/>
        <label for='columns'>Change number of columns:</label>
        <input type='text' value={formValue.columns} name='columns' onChange={handleChange} />

        {/* <button type='submit'>Submit</button> */}
      </form>
    </>
  );
};

export default App;

