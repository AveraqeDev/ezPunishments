import React from 'react';

const Cell = ({ content, header }) => {
  const cellMarkup = header ? (
    <th className='Cell__header'>
      {content}
    </th>
  ) : (
    <td className='Cell'>
      {content}
    </td>
  );

  return (cellMarkup);
}
 
export default Cell;