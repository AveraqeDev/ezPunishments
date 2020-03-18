import React, { Component } from 'react';
import Cell from './Cell';

import './DataTable.css';

class DataTable extends Component {

  renderHeadingRow = (_cell, cellIndex) => {
    const { headings } = this.props;

    return(
      <Cell 
        key={`header-${cellIndex}`}
        content={headings[cellIndex]}
        header={true}
      />
    );
  }

  renderRow = (_row, rowIndex) => {
    const { rows } = this.props;
    return (
      <tr key={`row-${rowIndex}`}>
        {rows[rowIndex].map((_cell, cellIndex) => {
          return (
            <Cell 
              key={`${rowIndex}-${cellIndex}`}
              content={rows[rowIndex][cellIndex]}
            />
          )
        })}
      </tr>
    )
  }

  render() { 
    const { headings, rows } = this.props;

    const theadMarkup = (
      <tr key='heading'>
        {headings.map(this.renderHeadingRow)}
      </tr>
    );

    const tbodyMarkup = rows.map(this.renderRow);

    return (
      <div className='DataTable'>
        <div className='ScrollContainer'>
          <table className='Table' ref={this.tableRef}>
            <thead>{theadMarkup}</thead>
            <tbody>{tbodyMarkup}</tbody>
          </table>
        </div>
      </div>
    )
  }
}
 
export default DataTable;