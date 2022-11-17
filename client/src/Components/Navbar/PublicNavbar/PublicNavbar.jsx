import "./PublicNavbarStyles.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import ursus from "../../../Assets/ursus_v5.png";
import { ThemeProvider } from "@emotion/react";
import NoAccountsRoundedIcon from "@mui/icons-material/NoAccountsRounded";

import {
  Toolbar,
  AppBar,
  createTheme,
  Typography,
  Drawer,
  Box,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";

const PublicNavbar = () => {
  const navigate = useNavigate();

  //mui theme
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
        main: "#f44336",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar>
          <Toolbar>
            <div className="public-nav-wrap">
              <div className="test">
                <Box
                  sx={{
                    // ml: 2,
                    cursor: "pointer",
                  }}
                  // alignItems="center"
                  role="presentation"
                  onClick={() => navigate("/")}
                >
                  <img className="public-ursus" src={ursus} alt="ursus logo" />
                </Box>
              </div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => navigate("/register")}
              >
                <NoAccountsRoundedIcon sx={{ mr: "0.3em" }} fontSize="large" />
                {/* {user && user.name} */}
              </IconButton>
            </div>
            {/* <UserAccount /> */}
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default PublicNavbar;
