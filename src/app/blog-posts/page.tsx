"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useList, useMany, HttpError } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import { Typography } from "@mui/material";
import React from "react";

export default function BlogPostList() {
  const { data, isLoading, isError } = useList<any, HttpError>({
    resource: "product/read",
  });

  // Extract the products array from the response data
  const products = data?.data?.DT || [];
  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        width: 70,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "price",
        headerName: "Price",
        width: 120,
        type: "number",
        valueFormatter: (params: any) => {
          return params.toLocaleString() || "";
        },
      },
      {
        field: "priceOld",
        headerName: "Old Price",
        width: 120,
        type: "number",
        valueFormatter: (params: string) => {
          return params.toLocaleString() || "";
        },
      },
      {
        field: "categoryId",
        headerName: "Category ID",
        width: 120,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid
        rows={products}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        loading={isLoading}
      />
    </List>
  );
}
