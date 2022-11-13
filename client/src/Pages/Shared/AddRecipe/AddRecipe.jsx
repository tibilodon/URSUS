import "./AddRecipeStyles.css";
import { useEffect, useState, useCallback } from "react";
import Alert from "../../../Components/Alert/Alert";
import InputField from "../../../Components/Input/InputField";
import InputFieldSelect from "../../../Components/Input/InputFieldSelect";
import { useAppContext } from "../../../Context/appContext";
import { useNavigate } from "react-router-dom";
import MultipleInput from "../../../Components/Input/MultipleInput/MultipleInput";
import { useRef } from "react";

const AddRecipe = () => {
  const navigate = useNavigate();

  const {
    clearValues,
    isEditing,
    isLoading,
    showAlert,
    displayAlert,
    editRecipe,
    createRecipe,
    handleChange,
    //recipe
    steps,
    ingredients,
    title,
    recipeType,
    recipeTypeOptions,
    timeMinutesValue,
    timeHoursValue,
  } = useAppContext();

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editRecipe();
      navigate("/all-recipes");
      return;
    }
    createRecipe();
    navigate("/all-recipes");
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

  return (
    <>
      <div>
        <form>
          <h3>{isEditing ? "edit recipe" : "create recipe"}</h3>
          {showAlert && <Alert />}
          {/*TODO: ---STEPS---*/}
          {!isEditing &&
            step.map((steps, i) => {
              return (
                <div key={i}>
                  <MultipleInput
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
          {/*TODO:----ingredients----*/}
          {!isEditing &&
            ingredient.map((ing, i) => {
              return (
                <div key={i}>
                  <MultipleInput
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
          <InputField
            type="text"
            name="title"
            value={title}
            handleChange={handleRecipeInput}
          />{" "}
          <InputFieldSelect
            labelText="recipeType"
            name="recipeType"
            value={recipeType}
            handleChange={handleRecipeInput}
            list={recipeTypeOptions}
          />
          {/*TODO:*/}
          <InputField
            type="number"
            labelText="perc"
            name="timeMinutesValue"
            value={timeMinutesValue}
            handleChange={handleRecipeInput}
          />{" "}
          <InputField
            type="number"
            labelText="óra"
            name="timeHoursValue"
            value={timeHoursValue}
            handleChange={handleRecipeInput}
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
