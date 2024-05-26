import React from "react";
import { Table } from "react-bootstrap";
import styles from "./TableShow.module.css"; // Import CSS module

const TableShow = ({ header, data }) => {
  const headerShow = header.map((item) => <th key={item.key} className={styles.header}>{item.name}</th>);

  // Generating rows with alternating colors
  const rows = data.map((item, index) => (
    <tr key={index}>
      {header.map((headerItem) => (
        <td key={headerItem.key}>{item[headerItem.key]}</td>
      ))}
      <td>Action</td>
    </tr>
  ));

  return (
    <Table className={styles.tableStyle}>
      <thead>
        <tr>
          {headerShow}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </Table>
  );
};

export default TableShow;
