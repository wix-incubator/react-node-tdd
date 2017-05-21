import React from 'react';
import PropTypes from 'prop-types';
import './Board.scss';

const Board = ({data, onCellClick}) => {
  const getCellRevealedClass = key => (data[JSON.stringify(key)] && data[JSON.stringify(key)].revealed) ? 'revealed' : '';
  return (
    <table>
      <tbody>
        {new Array(10).fill(undefined).map((row, x) =>
          <tr className="row" key={x} data-hook="row">
            {new Array(10).fill(undefined).map((cell, y) => <td className={getCellRevealedClass({x, y}) + ' cell'} onClick={() => onCellClick({x, y})} key={y} data-hook="cell"/>)}
          </tr>
        )}
      </tbody>
    </table>
  );
};

Board.propTypes = {
  data: PropTypes.object,
  onCellClick: PropTypes.func.isRequired
};

export default Board;
