import "./NavbarStyles.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAppContext } from "../../Context/appContext";

import Button from "@mui/material/Button";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import UserAccount from "./UserAccount/UserAccount";
import {
  Toolbar,
  AppBar,
  createTheme,
  Drawer,
  Box,
  Divider,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

import ursus from "../../Assets/ursus_v5.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clearValues, clearFilters } = useAppContext();
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
      active: {
        main: "#ed6c02",
      },
    },
  });

  //check route and set css
  const location = useLocation();
  const pathMathRoute = route => {
    if (route === location.pathname) {
      return true;
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <AppBar>
            <Toolbar>
              <Drawer
                anchor="left"
                open={isOpen}
                onClose={() => setIsOpen(!isOpen)}
              >
                <div className="boxWrap">
                  <div className="boxContent">
                    <Box
                      onClick={() => setIsOpen(!isOpen)}
                      textAlign="center"
                      role="presentation"
                    >
                      <Button
                        color={
                          pathMathRoute("/all-recipes") ? "active" : "inherit"
                        }
                        startIcon={
                          <MenuBookOutlinedIcon
                            style={{
                              fill: pathMathRoute("/all-recipes") && "#ed6c02",
                            }}
                          />
                        }
                        onClick={() => navigate("/all-recipes")}
                      >
                        Receptek
                      </Button>
                      <Divider />
                    </Box>{" "}
                  </div>
                  <div className="boxContent">
                    <Box
                      onClick={() => setIsOpen(!isOpen)}
                      textAlign="center"
                      role="presentation"
                    >
                      <Button
                        color={pathMathRoute("/") ? "active" : "inherit"}
                        startIcon={
                          <PermContactCalendarIcon
                            style={{
                              fill: pathMathRoute("/") && "#ed6c02",
                            }}
                          />
                        }
                        onClick={() => navigate("/")}
                      >
                        Receptjeim
                      </Button>
                      <Divider />
                    </Box>
                  </div>
                  <div className="boxContent">
                    <Box
                      onClick={() => setIsOpen(!isOpen)}
                      textAlign="center"
                      role="presentation"
                    >
                      <Button
                        color={
                          pathMathRoute("/add-recipe") ? "active" : "inherit"
                        }
                        startIcon={
                          <AddCircleIcon
                            style={{
                              fill: pathMathRoute("/add-recipe") && "#ed6c02",
                            }}
                          />
                        }
                        onClick={() => {
                          navigate("/add-recipe");
                          clearValues();
                        }}
                      >
                        Új Recept
                      </Button>
                      <Divider />
                    </Box>
                  </div>{" "}
                </div>
              </Drawer>

              <IconButton
                onClick={() => setIsOpen(true)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-controls="menu-appbar"
              >
                <MenuIcon />
              </IconButton>
              <div className="ursus-hover">
                <Box
                  sx={{ ml: 2, cursor: "pointer" }}
                  alignItems="center"
                  role="presentation"
                  onClick={() => {
                    navigate("/");
                    clearFilters();
                  }}
                >
                  <img
                    className={isOpen ? "sideMenu-open-ursus" : "ursus"}
                    src={ursus}
                    alt="ursus logo"
                  />
                </Box>
              </div>
              <UserAccount />
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </div>
    </>
  );
};

export default Navbar;
