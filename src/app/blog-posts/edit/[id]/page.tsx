// "use client";
// import { Box, TextField } from "@mui/material";
// import { HttpError, useParsed, useNavigation } from "@refinedev/core";
// import { Edit } from "@refinedev/mui";
// import { useForm } from "@refinedev/react-hook-form";
// import { editProducts } from "@services/blog-post";
// import { productValidationRules } from "@/lib/schema"; // import rules

// export default function BlogPostEdit() {
//   const { list } = useNavigation();
//   const { id } = useParsed();

//   const {
//     refineCore: { formLoading },
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<any, HttpError>({
//     refineCoreProps: {
//       resource: "product/detail",
//       id,
//       action: "edit",
//       queryOptions: {
//         select: (response) => ({ data: response.data.DT }),
//       },
//     },
//   });

//   const onSubmit = async (values: any) => {
//     const res = await editProducts(id, values.status, values.name);
//     if (res) list("products");
//   };

//   return (
//     <Edit
//       canDelete={false}
//       isLoading={formLoading}
//       saveButtonProps={{
//         onClick: handleSubmit(onSubmit),
//         children: "Update Product",
//         color: "success",
//         variant: "contained",
//       }}
//     >
//       <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
//         <TextField
//           {...register("name", productValidationRules.name)}
//           error={!!errors.name}
//           helperText={errors.name?.message as string}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           label="Name"
//         />
//         <TextField
//           {...register("status", productValidationRules.status)}
//           error={!!errors.status}
//           helperText={errors.status?.message as string}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           label="Status"
//         />
//       </Box>
//     </Edit>
//   );
// }

"use client";

import { Box, TextField } from "@mui/material";
import { HttpError, useParsed, useNavigation } from "@refinedev/core";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { editProducts } from "@services/blog-post";
import { productSchema, ProductFormValues } from "@/lib/schema";

export default function BlogPostEdit() {
  const { list } = useNavigation();
  const { id } = useParsed();

  const {
    refineCore: { formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema), // Dùng Zod để validate
    refineCoreProps: {
      resource: "product/detail",
      id,
      action: "edit",
      queryOptions: {
        select: (response) => ({
          data: response.data.DT,
        }),
      },
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    const res = await editProducts(id, values.status, values.name);
    if (res) list("products");
  };

  return (
    <Edit
      canDelete={false}
      isLoading={formLoading}
      saveButtonProps={{
        onClick: handleSubmit(onSubmit),
        children: "Update Product",
        color: "success",
        variant: "contained",
      }}
    >
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message as string}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Name"
        />
        <TextField
          {...register("status")}
          error={!!errors.status}
          helperText={errors.status?.message as string}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Status"
        />
      </Box>
    </Edit>
  );
}
