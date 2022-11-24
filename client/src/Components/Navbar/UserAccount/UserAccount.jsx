import "./UserAccountStyles.css";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Grid, Menu, MenuItem, Button, Box, createTheme } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
const UserAccount = () => {
  const theme = createTheme({
    typography: {
      h2: {
        fontSize: 80,
      },
    },
    palette: {
      primary: {
        main: "#1769aa",
      },
      secondary: {
        main: "#ffeb3b",
      },
    },
  });
  const navigate = useNavigate();
  const { user, logoutUser } = useAppContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const myAccount = () => {
    handleClose();
    navigate("profile");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="flex-end">
          <div>
            <Box onClick={handleMenu} textAlign="center" role="presentation">
              <Button startIcon={<AccountCircle style={{ fill: "#ffeb3b" }} />}>
                <h3 className="user-account">{user && user.name}</h3>
              </Button>
            </Box>{" "}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logoutUser}>Kijelentkezés</MenuItem>
              <MenuItem onClick={myAccount}>Profilom</MenuItem>
            </Menu>
          </div>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default UserAccount;
