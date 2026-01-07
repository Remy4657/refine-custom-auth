"use client";
import { useLogin, useTranslate } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Typography } from "@mui/material";
import { z } from "zod";
import Link from "next/link";

// Định nghĩa schema validate
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
  phoneNumber: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 số"),
  password: z.string().min(4, "Mật khẩu tối thiểu 4 ký tự"),
});

// Kiểu dữ liệu form dựa trên schema
type LoginFormValues = z.infer<typeof loginSchema>;

export default function CustomLoginPage() {
  const { mutate: login } = useLogin<LoginFormValues>();
  const translate = useTranslate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form data:", data);
    login(data); // Gọi API login của refine
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        mt: 8,
      }}
    >
      <Typography variant="h5" mb={3} textAlign="center">
        Đăng nhập
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <TextField
          {...register("email")}
          label="Email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Phone Number */}
        <TextField
          {...register("phoneNumber")}
          label="Số điện thoại"
          fullWidth
          margin="normal"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />

        {/* Password */}
        <TextField
          {...register("password")}
          label="Mật khẩu"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Đăng nhập
        </Button>
      </form>
      <Typography variant="body2" mt={2} textAlign="center">
        Chưa có tài khoản?{" "}
        <Link
          href="/register"
          style={{ color: "#1976d2", textDecoration: "none" }}
        >
          Đăng ký ngay
        </Link>
      </Typography>
    </Box>
  );
}
