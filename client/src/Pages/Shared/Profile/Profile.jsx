import "./ProfileStyles.css";
import { useState } from "react";
import { useAppContext } from "../../../Context/appContext";
import InputField from "../../../Components/Input/InputField";
import { Container, Box, Button } from "@mui/material";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  //states
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);

  const onSubmit = e => {
    e.preventDefault();
    if (!name || !email || !lastName) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName });
  };
  return (
    <div className="profile-wrap">
      <Container maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            height: "26em",
            bgcolor: "#cfe8fc",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showAlert}
          <h1>Profilom</h1>
          <form onSubmit={onSubmit}>
            <InputField
              type="text"
              name="name"
              value={name}
              searchLabel="keresztnév"
              handleChange={e => setName(e.target.value)}
              sx={{ mb: "1em", mt: "1em" }}
            />
            <InputField
              type="text"
              name="lastName"
              value={lastName}
              searchLabel="vezetéknév"
              handleChange={e => setLastName(e.target.value)}
              sx={{ mb: "1em" }}
            />
            <InputField
              type="text"
              name="email"
              value={email}
              searchLabel="e-mail"
              handleChange={e => setEmail(e.target.value)}
              sx={{ mb: "1em" }}
            />
            <div className="profile-submit">
              <Button disabled={isLoading} variant="contained" type="submit">
                {isLoading ? "Kérlek várj" : "Mentés"}
              </Button>
            </div>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Profile;
