import "./AddRecipeStyles.css";
import { useState } from "react";
import Alert from "../../../Components/Alert/Alert";
import InputField from "../../../Components/Input/InputField";
import InputFieldSelect from "../../../Components/Input/InputFieldSelect";
import { useAppContext } from "../../../Context/appContext";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const navigate = useNavigate();

  const {
    clearValues,
    isEditing,
    isLoading,
    showAlert,
    displayAlert,
    title,
    editRecipe,
    createRecipe,
    handleChange,
    recipeType,
    recipeTypeOptions,
  } = useAppContext();
  const handleSubmit = e => {
    e.preventDefault();
    if (!title) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editRecipe();
      return;
    }
    createRecipe();
    navigate("/all-recipes");
  };

  const handleRecipeInput = e => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <>
      <div>
        <form>
          <h3>{isEditing ? "edit recipe" : "create recipe"}</h3>
          {showAlert && <Alert />}
          <InputField
            type="text"
            name="title"
            value={title}
            handleChange={handleRecipeInput}
          />
          <InputFieldSelect
            labelText="recipeType"
            name="recipeType"
            value={recipeType}
            handleChange={handleRecipeInput}
            list={recipeTypeOptions}
          />

          <button type="submit" onClick={handleSubmit} disabled={isLoading}>
            submit
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              clearValues();
            }}
          >
            clear
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
