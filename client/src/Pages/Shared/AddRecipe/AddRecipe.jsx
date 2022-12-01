import "./AddRecipeStyles.css";
import { useState } from "react";
import Alert from "../../../Components/Alert/Alert";
import InputField from "../../../Components/Input/InputField";
import InputFieldSelect from "../../../Components/Input/InputFieldSelect";
import { useAppContext } from "../../../Context/appContext";
import { useNavigate } from "react-router-dom";
import MultipleInput from "../../../Components/Input/MultipleInput/MultipleInput";

import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ScaleIcon from "@mui/icons-material/Scale";

import axios from "axios";

const AddRecipe = () => {
  const navigate = useNavigate();

  const {
    isEditing,
    isLoading,
    showAlert,
    displayAlert,
    editRecipe,
    createRecipe,
    handleChange,
    steps,
    ingredients,
    title,
    recipeType,
    difficulty,
    difficultyOptions,
    recipeTypeOptions,
    timeMinutesValue,
    timeHoursValue,
    recipeImage,
  } = useAppContext();

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editRecipe();
      navigate("/");
      return;
    }
    createRecipe();
    navigate("/");
  };

  const [step, setStep] = useState([""]);

  const [fetchedStep, setFetchedStep] = useState(steps);

  const [ingredient, setIngredient] = useState([""]);
  const [fetchedIngredient, setFetchedIngredient] = useState(ingredients);

  const handleRecipeInput = e => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  //steps----
  const addStep = () => {
    let newStep = "";
    setStep([...step, newStep]);
  };

  const removeStep = i => {
    if (i > 0) {
      let stepData = [...step];
      stepData.splice(i, 1);
      setStep(stepData);
      handleChange({ name: "steps", value: stepData });
    }
  };

  const stepHandler = (i, e) => {
    let stepData = [...step];
    stepData[i] = e.target.value;
    setStep(stepData);
    handleChange({ name: e.target.name, value: stepData });
  };
  //----//----

  //fetched steps----
  const fetchedAddStep = () => {
    let newStep = "";
    setFetchedStep([...fetchedStep, newStep]);
  };

  const fetchedRemoveStep = (i, e) => {
    if (i > 0) {
      let stepData = [...fetchedStep];
      stepData.splice(i, 1);
      setFetchedStep(stepData);
      //TODO:adds "deleted" value
      handleChange({ name: "steps", value: stepData });
    }
  };

  const fetchedStepHandler = (i, e) => {
    let stepData = [...fetchedStep];
    stepData[i] = e.target.value;
    setFetchedStep(stepData);
    //TODO: this solves last char delay
    handleChange({ name: e.target.name, value: stepData });
  };
  //----//----

  //ingredients----
  const addIngredient = () => {
    let newIng = "";
    setIngredient([...ingredient, newIng]);
  };

  const removeIngredient = i => {
    if (i > 0) {
      let ingData = [...ingredient];
      ingData.splice(i, 1);
      setIngredient(ingData);
      handleChange({ name: "ingredients", value: ingData });
    }
  };

  const ingredientHandler = (i, e) => {
    let ingData = [...ingredient];
    ingData[i] = e.target.value;
    setIngredient(ingData);
    handleChange({ name: e.target.name, value: ingData });
  };
  //----//----

  //fetched ingredients
  const fetchedAddIngredient = () => {
    let newIng = "";
    setFetchedIngredient([...fetchedIngredient, newIng]);
  };

  const fetchedRemoveIngredient = i => {
    if (i > 0) {
      let ingData = [...fetchedIngredient];
      ingData.splice(i, 1);
      setFetchedIngredient(ingData);
      handleChange({ name: "ingredients", value: ingData });
    }
  };

  const fetchedIngredientHandler = (i, e) => {
    let ingData = [...fetchedIngredient];
    ingData[i] = e.target.value;
    setFetchedIngredient(ingData);
    handleChange({ name: e.target.name, value: ingData });
  };
  //----//----

  //---IMAGE----

  const [fileName, setFileName] = useState("");
  const onChangeImage = e => {
    setFileName(e.target.files[0]);
    console.log("FILES", e.target.files[0].name);
  };

  const handleImageSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("recipeImage", fileName);

    axios.post("/", formData);
  };

  return (
    <>
      <div className="add-recipe">
        <div className="add-recipe-wrap">
          <form onSubmit={handleImageSubmit} encType="multipart/form-data">
            <label htmlFor="file">choose image</label>
            <input
              type="file"
              name="recipeImage"
              filename="recipeImage"
              onChange={onChangeImage}
            />
          </form>
          <form className="recipe-form">
            {/* <label htmlFor="file">choose image</label>
            <input
              type="file"
              name="recipeImage"
              filename="recipeImage"
              onChange={onChangeImage}
            /> */}
            <div className="add-edit-wrap">
              <h2>{isEditing ? "Szerkesztés" : "Új recept"}</h2>
              {showAlert && <Alert />}
            </div>
            <div className="flex-center-wrap">
              <InputField
                searchLabel="title"
                type="text"
                name="title"
                value={title}
                handleChange={handleRecipeInput}
              />{" "}
            </div>
            <div className="other-details-wrap">
              <div className="flex-end-wrap">
                <div className="icon-align">
                  <div className="add-icon">
                    <ScaleIcon />
                  </div>
                  <InputFieldSelect
                    name="difficulty"
                    value={difficulty}
                    handleChange={handleRecipeInput}
                    list={difficultyOptions}
                  />
                </div>
              </div>{" "}
              <div className="flex-end-wrap">
                <div className="icon-align">
                  <div className="add-icon">
                    <LocalDiningIcon />
                  </div>
                  <InputFieldSelect
                    name="recipeType"
                    value={recipeType}
                    handleChange={handleRecipeInput}
                    list={recipeTypeOptions}
                  />{" "}
                </div>
              </div>
              {/*TODO:*/}
              <div className="flex-end-wrap">
                <div className="icon-align">
                  <div className="add-icon">
                    <AccessTimeIcon />
                  </div>
                  <div className="add-input">
                    <InputField
                      type="number"
                      searchLabel="perc"
                      name="timeMinutesValue"
                      value={timeMinutesValue}
                      handleChange={handleRecipeInput}
                    />{" "}
                  </div>
                  <div className="add-input time">
                    <InputField
                      type="number"
                      searchLabel="óra"
                      name="timeHoursValue"
                      value={timeHoursValue}
                      handleChange={handleRecipeInput}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*TODO: ---STEPS---*/}
            <div className="multi-wrap">
              <div className="ings">
                {!isEditing &&
                  ingredient.map((ing, i) => {
                    return (
                      <div key={i}>
                        <MultipleInput
                          searchLabel={`${i + 1}. hozzávaló`}
                          addHandler={addIngredient}
                          removeHandler={() => removeIngredient(i)}
                          value={ing}
                          name="ingredients"
                          handleChange={e => ingredientHandler(i, e)}
                          type="text"
                        />
                      </div>
                    );
                  })}{" "}
                {isEditing &&
                  fetchedIngredient.map((ings, i) => {
                    return (
                      <div key={i}>
                        <MultipleInput
                          searchLabel="ing"
                          addHandler={fetchedAddIngredient}
                          removeHandler={e => fetchedRemoveIngredient(i, e)}
                          value={ings}
                          name="ingredients"
                          handleChange={e => fetchedIngredientHandler(i, e)}
                          type="text"
                        />
                      </div>
                    );
                  })}
              </div>
              <div className="steps">
                {!isEditing &&
                  step.map((steps, i) => {
                    return (
                      <div key={i}>
                        <MultipleInput
                          searchLabel={`${i + 1}. lépés`}
                          addHandler={addStep}
                          removeHandler={() => removeStep(i)}
                          value={steps}
                          name="steps"
                          handleChange={e => stepHandler(i, e)}
                          type="text"
                        />
                      </div>
                    );
                  })}{" "}
                {isEditing &&
                  fetchedStep.map((steps, i) => {
                    return (
                      <div key={i}>
                        <MultipleInput
                          searchLabel="step"
                          addHandler={fetchedAddStep}
                          removeHandler={e => fetchedRemoveStep(i, e)}
                          value={steps}
                          name="steps"
                          handleChange={e => fetchedStepHandler(i, e)}
                          type="text"
                        />
                      </div>
                    );
                  })}
              </div>
              {/*TODO:----ingredients----*/}
            </div>

            <div className="flex-center-wrap">
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Kész
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
