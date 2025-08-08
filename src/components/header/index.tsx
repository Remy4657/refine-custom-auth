"use client";

import { ColorModeContext } from "@contexts/color-mode";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  useGetIdentity,
  useLogout,
  useActiveAuthProvider,
} from "@refinedev/core";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import Logout from "@mui/icons-material/Logout";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);
  const { data: user } = useGetIdentity<IUser>();
  const authProvider = useActiveAuthProvider();

  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const handleLogout = () => {
    mutateLogout();
  };

  return (
    <Box>
      <AppBar position={sticky ? "sticky" : "relative"}>
        <Toolbar>
          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <HamburgerMenu />
            <Stack
              direction="row"
              width="100%"
              justifyContent="flex-end"
              alignItems="center"
            >
              <IconButton
                color="inherit"
                onClick={() => {
                  setMode();
                }}
              >
                {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
              </IconButton>

              {(user?.avatar || user?.name) && (
                <Stack
                  direction="row"
                  gap="16px"
                  alignItems="center"
                  justifyContent="center"
                >
                  {user?.name && (
                    <Typography
                      sx={{
                        display: {
                          xs: "none",
                          sm: "inline-block",
                        },
                      }}
                      variant="subtitle2"
                    >
                      {user?.name}
                    </Typography>
                  )}
                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <Avatar
                          src={user?.avatar}
                          alt={user?.name}
                          {...bindTrigger(popupState)}
                        />
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <ListItemButton
                            key="logout"
                            onClick={() => handleLogout()}
                            sx={{
                              justifyContent: "center",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                justifyContent: "center",
                                minWidth: "24px",
                                transition: "margin-right 0.3s",
                                color: "currentColor",
                              }}
                            >
                              <Logout />
                            </ListItemIcon>
                            <ListItemText
                              primary="Logout"
                              primaryTypographyProps={{
                                noWrap: true,
                                fontSize: "14px",
                              }}
                            />
                          </ListItemButton>
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
