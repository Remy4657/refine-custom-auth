"use client";
import { useLogin } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// 1. Định nghĩa Zod Schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không hợp lệ"),
  password: z.string().min(4, "Mật khẩu phải có ít nhất 4 ký tự"),
  // .regex(/[A-Z]/, "Cần ít nhất 1 chữ hoa")
  // .regex(/[0-9]/, "Cần ít nhất 1 số"),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// 2. Trang Login Component
export default function LoginPage() {
  const {
    refineCore: { formLoading, onFinish },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema) as any,
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const { mutate: login } = useLogin<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    console.log("data: ", data);
    // login(data, {
    //   onSuccess: () => {
    //     window.location.href = "/";
    //   },
    // });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Đăng nhập hệ thống
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: "100%" }}
        >
          {/* Email Field */}
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Password Field */}
          <TextField
            margin="normal"
            fullWidth
            label="Mật khẩu"
            type="password"
            autoComplete="current-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* Remember Me Checkbox */}
          <FormControlLabel
            control={<Checkbox {...register("remember")} color="primary" />}
            label="Ghi nhớ đăng nhập"
            sx={{ mt: 1 }}
          />

          {/* Submit Button */}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={formLoading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Đăng nhập
          </LoadingButton>

          {/* Demo Credentials Hint */}
          <Alert severity="info" sx={{ mt: 2 }}>
            Demo: demo@refine.dev / demodemo
          </Alert>
        </Box>
      </Box>
    </Container>
  );
}
