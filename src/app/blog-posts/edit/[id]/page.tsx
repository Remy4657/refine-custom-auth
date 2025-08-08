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
import axios from "axios";
import { useNavigation } from "@refinedev/core";

export default function BlogPostEdit() {
  const { list, push } = useNavigation();
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
      queryOptions: {
        // Transform API response to match form structure
        select: (response) => {
          console.log("response: ", response);
          return {
            data: response.data.DT, // Extract DT object from response
          };
        },
      },
    },
  });
  // const { data, isLoading, isError } = useOne({
  //   resource: "product/detail",
  //   id,
  //   queryOptions: {
  //     select: (data) => data.data.DT, // Lấy data từ trường DT
  //   },
  // });
  // const productData = data as any;
  // useEffect(() => {
  //   if (productData) {
  //     setValue("name", productData.name);
  //     setValue("status", productData.status);
  //   }
  // }, [productData, setValue]);
  const onSubmit = async (values: any) => {
    try {
      console.log("value: ", values);
      const res = await axios.put(
        `http://localhost:8080/api/v1/admin/product/update`,
        { id: id, status: values.status, name: values.name }
      );
      if (res.status == 200) {
        list("products");
      }
      console.log("res update: ", res);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Edit
      canDelete={false}
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
            minLength: {
              value: 6,
              message: "Status must be at least 6 characters long",
            },
            pattern: {
              value: /(?=.*[a-z])(?=.*[A-Z])/, // Regular expression to require both lowercase and uppercase letters
              message:
                "Status must contain both uppercase and lowercase letters",
            },
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
            minLength: {
              value: 6,
              message: "Name must be at least 6 characters long",
            },
            pattern: {
              value: /(?=.*[a-z])(?=.*[A-Z])/, // Regular expression to require both lowercase and uppercase letters
              message: "Name must contain both uppercase and lowercase letters",
            },
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={"Name"}
          name="name"
        />
      </Box>
    </Edit>
  );
}
