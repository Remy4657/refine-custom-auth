"use client";

import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import React from "react";
import { Controller } from "react-hook-form";
import axios from "axios";
import { useNavigation } from "@refinedev/core";

export default function BlogPostCreate() {
  const { list } = useNavigation();

  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});

  // const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
  //   resource: "categories",
  // });
  const onSubmit = async (values: any) => {
    try {
      console.log("value: ", values);
      const res = await axios.post(
        `http://localhost:8080/api/v1/admin/product/create`,
        { name: values.name, price: values.price, priceOld: values.priceOld }
      );
      if (res.status == 200) {
        list("products");
      }
      console.log("res update: ", res);
    } catch (error) {
      console.error("Error create product:", error);
    }
  };
  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={{
        onClick: handleSubmit(onSubmit), // keep existing functionality
      }}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Name"}
          name="name"
        />
        <TextField
          {...register("price", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.price}
          helperText={(errors as any)?.price?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={"Price"}
          name="price"
        />
        <TextField
          {...register("priceOld", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.priceOld}
          helperText={(errors as any)?.priceOld?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={"Old Price"}
          name="priceOld"
        />
      </Box>
    </Create>
  );
}
