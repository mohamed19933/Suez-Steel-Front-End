import React from "react";
import DataTable from "react-data-table-component";
import { HashLoad } from "../index.js";
import "./DataTable.css";

const ModeTable = ({
  columns,
  data,
  paginationTotalRows,
  paginationPerPage,
  onChangeRowsPerPage,
  onChangePage,
  isLoading,
}) => {
  // Modify column definitions to make headers not sortable
  const modifiedColumns = columns.map((column) => ({
    ...column,
    sortable: false,
  }));

  return (
    <>
      <DataTable
        columns={modifiedColumns}
        data={data}
        noHeader
        responsive
        defaultSortField="ID"
        defaultSortAsc={false}
        pagination
        paginationServer
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        paginationTotalRows={paginationTotalRows}
        paginationPerPage={paginationPerPage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onChangePage={onChangePage}
        highlightOnHover
        progressComponent={<HashLoad />}
        progressPending={isLoading}
        className="datatable"
        fixedHeader
        selectableRowsHighlight
        conditionalRowStyles={[
          {
            when: (row) => row.STOP_STATUS === 1,
            style: {
              backgroundColor: "red", // Change this to the desired color
              color: "white",
            },
          },
        ]}
      />
    </>
  );
};

export default ModeTable;
