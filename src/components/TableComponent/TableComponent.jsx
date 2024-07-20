import { Table } from "antd";
import Loading from "../LoadingComponent/Loading";
// import React, { useState } from "react";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data = [],
    columns = [],
    isPending = false,
  } = props;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {},
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Loading isLoading={isPending}>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
