import "./ProfileStyles.css";
import ursus from "../../../Assets/ursus_v6_1.png";
import bgImage from "../../../Assets/login-bg_50.jpg";
import { useState } from "react";
import { useAppContext } from "../../../Context/appContext";

const NewProfile = () => {
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
    <>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="new-profile-wrap"
      >
        <form className="login-paper" onSubmit={onSubmit}>
          {/* <div className="login-paper"> */}
          <img src={ursus} alt="" />
          {showAlert}
          <h1>Profilom</h1>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="keresztnév"
          />
          <input
            type="text"
            placeholder="vezetéknév"
            name="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <input
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="e-mail"
          />

          <button disabled={isLoading} className="button-auth" type="submit">
            {isLoading ? "Kérlek várj" : "Mentés"}
          </button>
        </form>
        {/* </div> */}
      </div>
    </>
  );
};

export default NewProfile;
