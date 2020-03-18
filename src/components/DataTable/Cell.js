import React from 'react';

const Cell = ({ content, header, fixed }) => {
  const headerClass = header ? ' Cell-header' : '';

  const className = (
    `Cell${headerClass}`
  );

  const cellMarkup = header ? (
    <th className={className}>
      {content}
    </th>
  ) : (
    <td className={className}>
      {content}
    </td>
  );

  return (cellMarkup);
}
 
export default Cell;