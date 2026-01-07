"use client";

import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useGetIdentity } from "@refinedev/core";
import { changePasswords } from "@services/users";

export default function SettingsPage() {
  const [tab, setTab] = useState(0);
  const [avatar, setAvatar] = useState<string>("/default-avatar.png");
  type IUser = {
    id: number;
    name: string;
    email: string;
    avatar: string;
  };
  const { data: user } = useGetIdentity<IUser>();
  console.log("user: ", user);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleChangePassword = async () => {
    const res = await changePasswords("dat@gmail.com", "12345", "1234");
    console.log("res: ", res);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Card>
        <CardHeader title="Account Settings" />
        <Divider />
        <CardContent>
          <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Account Info" />
            <Tab label="Change Password" />
            <Tab label="Profile Image" />
          </Tabs>

          {/* Account Info */}
          {tab === 0 && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={user?.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={user?.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value="+84 123 456 789"
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Change Password */}
          {tab === 1 && (
            <Box component="form" sx={{ maxWidth: 400 }}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="password"
                label="New Password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleChangePassword()}
              >
                Change Password
              </Button>
            </Box>
          )}

          {/* Upload Profile Image */}
          {tab === 2 && (
            <Box textAlign="center">
              <Avatar
                src={avatar}
                alt="Profile"
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
              />
              <Button variant="outlined" component="label">
                Upload New Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
