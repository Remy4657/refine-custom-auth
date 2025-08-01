"use client";
import { useEffect } from "react";
import { Autocomplete, Box, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { HttpError, useOne, useParsed } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useParams } from "next/navigation";
import React from "react";
import { Controller } from "react-hook-form";

export default function BlogPostEdit() {
  // const {
  //   saveButtonProps,
  //   refineCore: { queryResult, formLoading, onFinish },
  //   handleSubmit,
  //   register,
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   refineCoreProps: {
  //     resource: "admin/product/detail",
  //   },
  // });

  const { id } = useParsed();
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    saveButtonProps,
  } = useForm({
    refineCoreProps: {
      resource: "product/detail", // Resource bạn muốn custom
      id, // ID của item cần update
      action: "edit",
    },
  });
  const { data, isLoading, isError } = useOne({
    resource: "product/detail",
    id,
    queryOptions: {
      select: (data) => data.data.DT, // Lấy data từ trường DT
    },
  });
  const productData = data as any;
  useEffect(() => {
    if (productData) {
      setValue("name", productData.name);
      setValue("status", productData.status);
    }
  }, [productData, setValue]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product data</div>;
  const onSubmit = async (values: any) => {
    try {
      console.log("value: ", values);
      // const response = await fetch(`/api/admin/product/update/${id}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(values),
      // });

      // if (!response.ok) throw new Error("Update failed");

      // const result = await response.json();
      // console.log("Updated:", result);
      // Optional: Hiển thị thông báo hoặc điều hướng
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={{
        onClick: handleSubmit(onSubmit), // keep existing functionality
        children: "Update Product", // change button text
        color: "success", // change button color
        variant: "contained", // change button style
      }}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("status", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.status}
          helperText={(errors as any)?.status?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Status"}
          name="status"
        />
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={"Name"}
          name="name"
          rows={2}
        />
      </Box>
    </Edit>
  );
}
