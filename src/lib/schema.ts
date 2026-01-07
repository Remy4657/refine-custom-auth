// export const productValidationRules = {
//   name: {
//     required: "This field is required",
//     minLength: {
//       value: 6,
//       message: "Name must be at least 6 characters long",
//     },
//     pattern: {
//       value: /(?=.*[a-z])(?=.*[A-Z])/,
//       message: "Name must contain both uppercase and lowercase letters",
//     },
//   },
//   status: {
//     required: "This field is required",
//     minLength: {
//       value: 6,
//       message: "Status must be at least 6 characters long",
//     },
//     pattern: {
//       value: /(?=.*[a-z])(?=.*[A-Z])/,
//       message: "Status must contain both uppercase and lowercase letters",
//     },
//   },
// };

import { z } from "zod";

/**
 * Schema xác thực dữ liệu sản phẩm
 */
export const productSchema = z.object({
  name: z
    .string()
    .min(6, { message: "Name must be at least 6 characters long" })
    .regex(/(?=.*[a-z])(?=.*[A-Z])/, {
      message: "Name must contain both uppercase and lowercase letters",
    }),
  status: z
    .string()
    .min(6, { message: "Status must be at least 6 characters long" })
    .regex(/(?=.*[a-z])(?=.*[A-Z])/, {
      message: "Status must contain both uppercase and lowercase letters",
    }),
});

/**
 * TypeScript type được suy ra từ schema
 */
export type ProductFormValues = z.infer<typeof productSchema>;
