import React from 'react';
import { ITableProps } from '../types';

const Table = ({ items, fields }:ITableProps) => {
  if (!items.length) {
    return <div>Empty table</div>;
  }
  const noValue = 'N/a';
  const headers = fields.map((fieldName, index) => <th key={index}>{fieldName}</th>);
  const renderCell = (item) => fields.map((fieldName, index) => <td key={index} style={{ textAlign: 'center' }}>{item[fieldName] || noValue}</td>);
  const rows = items.map((item, index) => (
    <tr key={index}>
      {renderCell(item)}
    </tr>
  ));

  return (
    <table width="100%">
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default Table;
