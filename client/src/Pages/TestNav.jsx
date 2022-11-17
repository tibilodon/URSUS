import React from "react";
import UserAccount from "../Components/Navbar/UserAccount/UserAccount";
import { useAppContext } from "../Context/appContext";

const TestNav = () => {
  const { user } = useAppContext();
  return (
    <div>
      <h1> TestNav</h1>
      {user ? <UserAccount /> : <h1>NOT USER</h1>}
    </div>
  );
};

export default TestNav;
