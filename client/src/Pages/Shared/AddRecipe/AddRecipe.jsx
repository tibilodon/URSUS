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
    title,
    recipeType,
    recipeTypeOptions,
    timeMinutesValue,
    timeHoursValue,
    steps,
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

  const handleRecipeInput = e => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const addHandler = () => {
    let newStep = "";
    setStep([...step, newStep]);
    setFetchedStep([...fetchedStep, newStep]);
  };

  const fetchedAddHandler = () => {
    let newStep = "";
    setFetchedStep([...fetchedStep, newStep]);
    // console.log("FETCHHANDLER");
  };

  const fetchedRemoveHandler = (i, e) => {
    if (i > 0) {
      let stepData = [...fetchedStep];
      stepData.splice(i, 1);
      console.log("STEPDATA SLICED", stepData);
      // console.log("STEPDATA", stepData);
      setFetchedStep(stepData);
      //TODO:adds "deleted" value
      handleChange({ name: "steps", value: stepData });
    }
    console.log("fetchedStep FROM REMOVE HANDLER", fetchedStep);
  };

  const fetchedHandler = (i, e) => {
    let stepData = [...fetchedStep];
    stepData[i] = e.target.value;
    setFetchedStep(stepData);
    //TODO: this solves last char delay
    handleChange({ name: e.target.name, value: stepData });
    console.log("fetchedStepv IN HANDLER", fetchedStep);
  };

  //TODO: CUSTOM HANDLER
  const stepHandler = (i, e) => {
    let stepData = [...step];
    stepData[i] = e.target.value;
    setStep(stepData);
    setFetchedStep(stepData);
    console.log("STEPDATA", stepData);
    handleChange({ name: e.target.name, value: stepData });
  };

  const removeHandler = i => {
    if (i > 0) {
      let stepData = [...step];
      stepData.splice(i, 1);
      setStep(stepData);
      handleChange({ name: "steps", value: stepData });

      // setFetchedStep(stepData);
      console.log("REGULAR REMOVEHANDLER", step);
    }
  };

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
                    addHandler={addHandler}
                    removeHandler={() => removeHandler(i)}
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
                    addHandler={fetchedAddHandler}
                    removeHandler={e => fetchedRemoveHandler(i, e)}
                    value={steps}
                    name="steps"
                    handleChange={e => fetchedHandler(i, e)}
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
