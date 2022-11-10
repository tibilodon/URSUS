import "./AddRecipeStyles.css";
import { useEffect, useState } from "react";
import Alert from "../../../Components/Alert/Alert";
import InputField from "../../../Components/Input/InputField";
import InputFieldSelect from "../../../Components/Input/InputFieldSelect";
import { useAppContext } from "../../../Context/appContext";
import { useNavigate } from "react-router-dom";
import MultipleInput from "../../../Components/Input/MultipleInput/MultipleInput";

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

  const [step, setStep] = useState([
    {
      step: "",
    },
  ]);

  const handleRecipeInput = e => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const [fetchedStep, setFetchedStep] = useState([step0, step1, step2, step3]);

  // useEffect(() => {
  //   const fetchStep = () => {
  //     step0 && setFetchedStep([{ step0, step1, step2 }]);
  //   };
  //   fetchStep();
  //   console.log("FETCHED", fetchedStep.step0);
  //   console.log(step0);
  // }, [step0]);

  // const [stepper, setStepper] = useState([]);
  // const stepper = [];

  // useEffect(() => {
  //   const fetchSteps = () => {
  //     if (step1) stepper.push(step1);
  //     if (step2) stepper.push(step2);
  //     if (step3) stepper.push(step3);
  //     // step1 && setStepper([...stepper, step1]);
  //     // step2 && setStepper([...stepper, step2]);
  //     // step3 && setStepper([...stepper, step3]);
  //   };
  //   fetchSteps();
  // }, [step1, step2, step3]);

  // if (isEditing) setStep(stepper);

  // if (step1) setStepper([...stepper, step1]);
  // if (step2) setStepper([...stepper, step2]);
  // if (step3) setStepper([...stepper, step3]);

  // if (step1) stepper.push(step1);
  // if (step2) stepper.push(step2);
  // if (step3) stepper.push(step3);
  // console.log("STEPPER", stepper);

  // const [add, setAdd] = useState({ step1, step2 });

  const addHandler = () => {
    let newStep = { step: "" };
    setStep([...step, newStep]);
    // setAdd([...step, newStep]);
  };

  // const [stepOne, setStepOne] = useState(step1);

  //TODO: CUSTOM HANDLER
  const stepHandler = (i, e) => {
    // e.preventDefault();
    // console.log(`STEP:${step}`);
    let stepData = [...step];
    // stepData[i][e.target.name] = e.target.value;
    stepData[i] = e.target.value;
    setStep(stepData);
    console.log(i);
    console.log(e.target.name);
    console.log(e.target.value);
    // step1.push(stepData[0].step);
    // console.log(stepData[0]);
    // console.log(step1);
    // step1 += step[0].step;
    // step1 += stepData[0];

    handleChange({ name: e.target.name, value: e.target.value });

    // step1 = stepData[0];
    // console.log("STEPDATA", stepData);
    // console.log("STEP COLL", step);
    // console.log("step01", step1);
  };

  // const stepper = [{ step1, step2 }];

  const removeHandler = i => {
    if (i > 0) {
      let stepData = [...step];
      stepData.splice(i, 1);
      setStep(stepData);
      // stepper.push(stepData);
    }
  };

  // const [t, setT] = useState(false);

  // const setVisible = () => {
  //   setT(!t);
  // };

  // const newAdd = () => {
  //   if (step1) {
  //     setT(
  //       <MultipleInput
  //         addHandler={addHandler}
  //         // removeHandler={() => removeHandler(index)}
  //         value={step2}
  //         name="step2"
  //         handleChange={handleRecipeInput}
  //         type="text"
  //       />
  //     );
  //   }
  //   return;
  // };

  console.log(step);
  console.log(fetchedStep);

  return (
    <>
      <div>
        <form>
          <h3>{isEditing ? "edit recipe" : "create recipe"}</h3>
          {showAlert && <Alert />}
          {!isEditing &&
            step.map((steps, i) => {
              return (
                <div key={i}>
                  <MultipleInput
                    addHandler={addHandler}
                    removeHandler={() => removeHandler(i)}
                    value={steps.step}
                    // name={steps.step}
                    // label={steps.step}
                    name={`step${i}`}
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
                    addHandler={addHandler}
                    removeHandler={() => removeHandler(i)}
                    value={steps}
                    // name={steps.step}
                    // label={steps.step}
                    name={`step${i}`}
                    handleChange={handleRecipeInput}
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
