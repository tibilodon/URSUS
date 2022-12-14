import React from "react";
import "./EditAllowedStyles.css";
import editIcon from "../../Assets/edit_ico.svg";
import deleteIcon from "../../Assets/delete_ico.svg";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/appContext";

const EditAllowed = ({ id }) => {
  const { setEditRecipe, deleteRecipe } = useAppContext();
  return (
    <>
      <div className="edit-pill-wrap">
        <Link to="/add-recipe">
          <button onClick={() => setEditRecipe(id)}>
            <img src={editIcon} alt="" />
          </button>
        </Link>
        <button onClick={() => deleteRecipe(id)}>
          <img src={deleteIcon} alt="" />
        </button>
      </div>
    </>
  );
};

export default EditAllowed;
