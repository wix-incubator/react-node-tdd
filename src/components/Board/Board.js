import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Board.scss';

const Board = ({data, onCellClick}) => {
  const getCellClass = key => {
    const revealed = data[JSON.stringify(key)] && data[JSON.stringify(key)].revealed;
    const mine = data[JSON.stringify(key)] && data[JSON.stringify(key)].mine;
    return classNames({
      cell: true,
      revealed,
      mine
    });
  };

  return (
    <table>
      <tbody>
        {new Array(10).fill(undefined).map((row, x) =>
          <tr className="row" key={x} data-hook="row">
            {new Array(10).fill(undefined).map((cell, y) => <td className={getCellClass({x, y})} onClick={() => onCellClick({x, y})} key={y} data-hook="cell"/>)}
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
