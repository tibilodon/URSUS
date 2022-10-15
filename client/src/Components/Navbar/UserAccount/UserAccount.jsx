import "./UserAccountStyles.css";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Grid, Menu, MenuItem, IconButton, Button } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import { useNavigate } from "react-router-dom";
const UserAccount = () => {
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
      <Grid container justifyContent="flex-end">
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle sx={{ mr: "0.3em" }} />
            {/* {user && user.name} */}
            <div className="user-account">{user && user.name}</div>
          </IconButton>
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
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
            <MenuItem onClick={myAccount}>My account</MenuItem>
          </Menu>
        </div>
      </Grid>
    </>
  );
};

export default UserAccount;
