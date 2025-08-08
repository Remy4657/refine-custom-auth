"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  useList,
  useMany,
  HttpError,
  useTranslate,
  useTranslation,
} from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
} from "@refinedev/mui";
import React from "react";
import axios from "axios";

import LanguageSwitcher from "@components/change-language";

export default function BlogPostList() {
  // Define your interfaces
  interface Product {
    id: string;
    name: string;
    price: number;
    priceOld: number;
    categoryId: string;
  }

  interface ProductListResponse {
    EM: string;
    EC: number;
    DT: Product[];
  }

  interface DataResponse {
    data: ProductListResponse;
    total?: number;
  }
  const translate = useTranslate();

  const { data, isLoading, isError, refetch } = useList<
    DataResponse,
    HttpError
  >({
    resource: "product/read",
  });
  // Extract the products array from the response data
  const products = data?.data.DT || [];
  const handleDelete = async (id: any) => {
    console.log("delete action: ", id);
    try {
      const res = await axios.delete(
        "http://localhost:8080/api/v1/admin/product/delete",
        { data: { id: id } }
      );
      if (res.status == 200) {
        await refetch();
      }
      console.log("res delete: ", res);
    } catch (error) {
      console.log("error: ", error);
    }
  };

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
        sortComparator: (v1, v2) => {
          // Loại bỏ dấu tiếng Việt (nếu cần), rồi so sánh không phân biệt hoa/thường
          const normalize = (str: string) =>
            str
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase();

          return normalize(v1).localeCompare(normalize(v2));
        },
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "price",
        headerName: "Price",
        width: 120,
        type: "number",
        // valueFormatter: (params: any) => {
        //   return params.toLocaleString() || "";
        // },
      },
      {
        field: "priceOld",
        headerName: "Old Price",
        width: 120,
        type: "number",
        // valueFormatter: (params: string) => {
        //   return params.toLocaleString() || "";
        // },
      },
      {
        field: "categoryId",
        headerName: "Category ID",
        width: 120,
      },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        width: 200,
        type: "dateTime",
        valueGetter: (params) => new Date(params),
        valueFormatter: (params) => new Date(params).toLocaleString("vi-VN"),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <EditButton hideText recordItemId={row.id} />
                <ShowButton hideText recordItemId={row.id} />
                <div>
                  <DeleteButton
                    onClick={() => handleDelete(row.id)}
                    hideText
                    recordItemId={row.id}
                    confirmTitle="Delete Product"
                    confirmOkText="OK"
                  />
                </div>
              </div>
            </>
          );
        },
      },
    ],
    [products]
  );

  return (
    <div>
      <LanguageSwitcher />
      <h1>{translate("blog_posts.fields.status.title")}</h1>
      <List>
        <DataGrid
          disableColumnMenu
          rows={products}
          columns={columns}
          pageSizeOptions={[5, 10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
            sorting: {
              sortModel: [{ field: "createdAt", sort: "desc" }],
            },
          }}
          loading={isLoading}
        />
      </List>
    </div>
  );
}
