"use client";
import { AuthPage as AuthPageBase } from "@refinedev/mui";
import type { AuthPageProps } from "@refinedev/core";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Định nghĩa schema validation bằng Zod
const authSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc"),
  password: z
    .string()
    .min(4, "Mật khẩu phải có ít nhất 4 ký tự")
    .max(32, "Mật khẩu không được quá 32 ký tự"),
});

export const AuthPage = (props: AuthPageProps) => {
  return (
    <AuthPageBase
      {...props}
      formProps={{
        resolver: zodResolver(authSchema) as any, // Thêm resolver Zod
        // defaultValues: { email: "demo@refine.dev", password: "demodemo" },
      }}
      // Có thể override các components nếu cần
      // registerProps={{
      //   name: {
      //     required: true,
      //   },
      // }}
      // loginProps={{
      //   password: {
      //     required: true,
      //   },
      // }}
    />
  );
};
