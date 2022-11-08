import "./AddRecipeStyles.css";
import { useState } from "react";
import Alert from "../../../Components/Alert/Alert";
import InputField from "../../../Components/Input/InputField";
import InputFieldSelect from "../../../Components/Input/InputFieldSelect";
import { useAppContext } from "../../../Context/appContext";
import { useNavigate } from "react-router-dom";
import MultipleInput from "../../../Components/Input/MultipleInput/MultipleInput";

const AddRecipe = () => {
  const navigate = useNavigate();

  let {
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
    step_01,
    step_02,
    step_03,
    step_04,
    step_05,
    step_06,
    step_07,
    step_08,
    step_09,
    step_010,
    step_011,
    step_012,
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

  // const [add, setAdd] = useState({ step_01, step_02 });

  const addHandler = () => {
    let newStep = { step: "" };
    setStep([...step, newStep]);
    // setAdd([...step, newStep]);
  };

  // const [stepOne, setStepOne] = useState(step_01);

  const handleRecipeInput = e => {
    // let stepData = [...step];
    // stepData[i][e.target.name] = e.target.value;
    handleChange({ name: e.target.name, value: e.target.value });
    console.log(step_01);
    // setStepOne(e.target.value);
    // console.log(`step_01:${step_01}`);
    // console.log(`step_01:${step_01}`);

    // console.log(`STEPIONE:${stepOne}`);
  };

  const stepHandler = (i, e) => {
    // e.preventDefault();
    // console.log(`STEP:${step}`);
    let stepData = [...step];
    // stepData[i][e.target.name] = e.target.value;
    stepData[i] = e.target.value;
    setStep(stepData);
    step_01 += step[0];

    handleChange({ name: e.target.name, value: e.target.value });

    // step_01 = stepData[0];
    console.log(step);
    // console.log(stepData);
    console.log("step01", step_01);
  };

  // const stepper = [{ step_01, step_02 }];

  const removeHandler = i => {
    if (i > 0) {
      let stepData = [...step];
      stepData.splice(i, 1);
      setStep(stepData);
    }
  };

  // const [t, setT] = useState(false);

  // const setVisible = () => {
  //   setT(!t);
  // };

  // const newAdd = () => {
  //   if (step_01) {
  //     setT(
  //       <MultipleInput
  //         addHandler={addHandler}
  //         // removeHandler={() => removeHandler(index)}
  //         value={step_02}
  //         name="step_02"
  //         handleChange={handleRecipeInput}
  //         type="text"
  //       />
  //     );
  //   }
  //   return;
  // };

  return (
    <>
      <div>
        <form>
          <h3>{isEditing ? "edit recipe" : "create recipe"}</h3>
          {showAlert && <Alert />}
          {step.map((steps, i) => {
            return (
              <div key={i}>
                <MultipleInput
                  addHandler={addHandler}
                  removeHandler={() => removeHandler(i)}
                  value={step.steps}
                  // name={steps.step}
                  // label={steps.step}
                  name={`step0${i + 1}`.toString()}
                  handleChange={e => stepHandler(i, e)}
                  type="text"
                />
              </div>
            );
          })}
          {/* <MultipleInput
            addHandler={setVisible}
            // removeHandler={() => removeHandler(i)}
            value={step_01}
            name="step_01"
            handleChange={handleRecipeInput}
            type="text"
            hidden={t}
          />{" "}
          <MultipleInput
            // addHandler={() => newAdd()}
            // removeHandler={() => removeHandler(i)}
            value={step_02}
            name="step_02"
            handleChange={handleRecipeInput}
            type="text"
          /> */}
          {/* {t} */}
          <InputField
            type="text"
            name="title"
            value={title}
            handleChange={handleRecipeInput}
          />{" "}
          {/* <InputField
            type="text"
            name="step_01"
            value={step_01}
            handleChange={handleRecipeInput}
          /> */}
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
