import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavbarStyles.css";
import Button from "@mui/material/Button";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

// import AppBar from "@mui/material/AppBar";
import {
  Toolbar,
  AppBar,
  createTheme,
  Typography,
  Drawer,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { orange, purple, blue } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

import ursus from "../../Assets/ursus_v5.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  const navigate = useNavigate();
  return (
    <>
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
                    // width="10em"
                    textAlign="center"
                    role="presentation"
                  >
                    <Button
                      color="inherit"
                      // color="secondary"
                      startIcon={<MenuBookOutlinedIcon />}
                      onClick={() => navigate("/receptek")}
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
                      color="inherit"
                      // color="secondary"
                      startIcon={<PermContactCalendarIcon />}
                      // onClick={() => navigate("/")}
                    >
                      Receptjeim
                    </Button>
                    <Divider />
                    {/* <Divider /> */}
                  </Box>
                </div>
                <div className="boxContent">
                  <Box
                    onClick={() => setIsOpen(!isOpen)}
                    textAlign="center"
                    role="presentation"
                  >
                    <Button
                      color="inherit"
                      // color="secondary"
                      startIcon={<AddCircleIcon />}
                      onClick={() => navigate("/uj")}
                    >
                      Új Recept
                    </Button>
                    {/* <Divider /> */}
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

              // sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{ ml: 2, cursor: "pointer" }}
              alignItems="center"
              role="presentation"
              onClick={() => navigate("/")}
            >
              {/* <Button
                color="inherit"
                startIcon={<PermContactCalendarIcon />}
              >
                Receptjeim
              </Button> */}
              {/* <Divider /> */}
              {/* <Divider /> */}
              <img
                className={isOpen ? "sideMenu-open-ursus" : "ursus"}
                src={ursus}
                alt="ursus logo"
              />
            </Box>
            {/* <IconButton size="large">
              <Button
                color="inherit"
                // color="secondary"
                startIcon={<MenuBookOutlinedIcon />}
                // onClick={() => navigate("/")}
              >
                Receptek
              </Button>
            </IconButton> */}
            <Grid container justifyContent="flex-end">
              <IconButton
                size="'large"
                aria-label="account of current user/login"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => navigate("/")}
              >
                <AccountCircle />
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Navbar;