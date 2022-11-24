import "./PublicNavbarStyles.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import ursus from "../../../Assets/ursus_v5.png";
import { ThemeProvider } from "@emotion/react";
import NoAccountsRoundedIcon from "@mui/icons-material/NoAccountsRounded";
import InfoIcon from "@mui/icons-material/Info";
import { useAppContext } from "../../../Context/appContext";

import { Toolbar, AppBar, createTheme, Box, IconButton } from "@mui/material";

const PublicNavbar = () => {
  const { user } = useAppContext();
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
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => navigate("/landing")}
              >
                <InfoIcon sx={{ mr: "0.3em" }} fontSize="large" />
              </IconButton>
              <div className="ursus-hover">
                <Box
                  sx={{
                    cursor: "pointer",
                  }}
                  role="presentation"
                  onClick={() => navigate("/")}
                >
                  <img className="public-ursus " src={ursus} alt="ursus logo" />
                </Box>
              </div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={
                  user ? () => navigate("/") : () => navigate("/register")
                }
              >
                <NoAccountsRoundedIcon sx={{ mr: "0.3em" }} fontSize="large" />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default PublicNavbar;
