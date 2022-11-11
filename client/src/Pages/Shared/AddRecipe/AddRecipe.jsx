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
    step0,
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    step7,
    step8,
    step9,
    step10,
    step11,
    step12,
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

  const [step, setStep] = useState([{ step: "" }]);

  const [testStep, setTestStep] = useState(steps);

  const handleRecipeInput = e => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const [fetchedStep, setFetchedStep] = useState([step0, step1, step2]);

  const addHandler = () => {
    let newStep = { step: "" };
    setStep([...step, newStep]);

    setTestStep([...testStep, newStep]);
    // setAdd([...step, newStep]);
  };

  // let fetched = steps;

  const fetchedAddHandler = () => {
    let newStep = "";
    setTestStep([...testStep, newStep]);
    // fetched = [...fetched, newStep];
    setFetchedStep([...fetchedStep, newStep]);
    // console.log("FETCHHANDLER", fetchedStep);
    // setAdd([...step, newStep]);
  };
  // let data;

  const fetchedRemoveHandler = (i, e) => {
    if (i > 0) {
    }
    let stepData = [...testStep];
    stepData.splice(i, 1);

    console.log("STEPDATA SLICED", stepData);
    // console.log("STEPDATA", stepData);
    setTestStep(stepData);
    // setTestStep(data);

    console.log("TESTSTEP FROM REMOVE HANDLER", testStep);
    console.log("STEPDATA FROM REMOVE HANDLER", stepData);
    // fetched = stepData;
  };

  const fetchedHandler = (i, e) => {
    let stepData = [...testStep];
    stepData[i] = e.target.value;
    setTestStep(stepData);
    //TODO: this solves last char delay
    handleChange({ name: e.target.name, value: stepData });
    console.log("TESTSTEPv IN HANDLER", testStep);
  };

  //TODO: CUSTOM HANDLER
  const stepHandler = (i, e) => {
    let stepData = [...step];

    stepData[i] = e.target.value;
    setStep(stepData);
    setTestStep(stepData);
    console.log("STEPDATA", stepData);

    handleChange({ name: e.target.name, value: step });
  };

  const removeHandler = i => {
    if (i > 0) {
      let stepData = [...step];
      stepData.splice(i, 1);
      setStep(stepData);
      setTestStep(stepData);
    }
  };

  // console.log("STEP OUTSIDE OF EVERYTING", step);
  // console.log("TESTsTEP OUTSIDE OF EVERYTING", testStep);
  // console.log("FETCHED STEP OUTSIDE OF EVERYTING", fetchedStep);

  useEffect(() => {
    // console.log("---TEST STEP:", testStep);
  }, [testStep, steps]);

  return (
    <>
      <div>
        <form>
          <h3>{isEditing ? "edit recipe" : "create recipe"}</h3>
          {showAlert && <Alert />}
          {/* {!isEditing &&
            step.map((steps, i) => {
              return (
                <div key={i}>
                  <MultipleInput
                    addHandler={addHandler}
                    removeHandler={() => removeHandler(i)}
                    value={steps.step}
                    name={`step${i}`}
                    handleChange={e => stepHandler(i, e)}
                    type="text"
                  />
                </div>
              );
            })} */}
          {/*TODO: ---TEST---*/}
          {!isEditing &&
            step.map((steps, i) => {
              return (
                <div key={i}>
                  <MultipleInput
                    addHandler={addHandler}
                    removeHandler={() => removeHandler(i)}
                    value={steps.step}
                    name="steps"
                    handleChange={e => stepHandler(i, e)}
                    type="text"
                  />
                </div>
              );
            })}{" "}
          {isEditing &&
            testStep.map((steps, i) => {
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
