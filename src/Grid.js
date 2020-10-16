import React from 'react'

const rows = 25;
const columns = 25;

export default function Grid({ board }) {

  const gameGrid = [];
  for (let r = 0; r < rows; r++) {
      const tableRows = [];
      for (let c = 0; c < columns; c++) {
          tableRows.push(
              <td className={board[r][c] ? 'alive' : 'dead'} />
          );
      }
    gameGrid.push(<tr>{tableRows}</tr>);
  }
  return <table>{gameGrid}</table>;
};


