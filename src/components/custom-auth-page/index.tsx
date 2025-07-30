"use client";
import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // You can call your login API here
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        boxShadow: 3,
        borderRadius: 1,
      }}
    >
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={handleEmailChange}
        required
      />

      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginComponent;
