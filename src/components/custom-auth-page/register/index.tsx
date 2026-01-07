"use client";
import Link from "next/link";
import { useRegister } from "@refinedev/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Box, Typography } from "@mui/material";
import { z } from "zod";

// Schema validation
const registerSchema = z
  .object({
    email: z.string().email("Email không hợp lệ").min(1, "Email là bắt buộc"),
    phoneNumber: z
      .string()
      .min(1, "Số điện thoại là bắt buộc")
      .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 số"),
    password: z.string().min(4, "Mật khẩu tối thiểu 4 ký tự"),
    confirmPassword: z.string().min(4, "Xác nhận mật khẩu tối thiểu 4 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"], // báo lỗi ở confirmPassword
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function CustomRegisterPage() {
  const { mutate: registerUser } = useRegister<RegisterFormValues>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Register data:", data);
    registerUser(data); // Gọi API register của refine
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
        Đăng ký
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

        {/* Confirm Password */}
        <TextField
          {...register("confirmPassword")}
          label="Xác nhận mật khẩu"
          type="password"
          fullWidth
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Đăng ký
        </Button>
      </form>
      <Typography variant="body2" mt={2} textAlign="center">
        Đã có tài khoản?{" "}
        <Link
          href="/login"
          style={{ color: "#1976d2", textDecoration: "none" }}
        >
          Đăng nhập ngay
        </Link>
      </Typography>
    </Box>
  );
}
