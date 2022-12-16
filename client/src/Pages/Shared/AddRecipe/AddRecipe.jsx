import "./AddRecipeStyles.css";
import { useState } from "react";
import Alert from "../../../Components/Alert/Alert";
import InputField from "../../../Components/Input/InputField";
import InputFieldSelect from "../../../Components/Input/InputFieldSelect";
import { useAppContext } from "../../../Context/appContext";
import { useNavigate } from "react-router-dom";
import MultipleInput from "../../../Components/Input/MultipleInput/MultipleInput";

//firebase
import { storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { useEffect } from "react";
import BtnOne from "../../../Components/Buttons/BtnOne";
import addBg from "../../../Assets/add-bg.jpg";
import difficultyIco from "../../../Assets/difficulty.svg";
import typeIco from "../../../Assets/rec-type.svg";
import timeIco from "../../../Assets/time.svg";
import uploadIco from "../../../Assets/upload_ico.svg";
import deleteIco from "../../../Assets/delete_ico.svg";

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
    imgRef,
    // imgURL,
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

  const [fetchedStep, setFetchedStep] = useState(
    steps.length < 1 ? [""] : steps
  );

  const [ingredient, setIngredient] = useState([""]);

  const [fetchedIngredient, setFetchedIngredient] = useState(
    ingredients.length < 1 ? [""] : ingredients
  );

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

  //TODO:---FIREBASE----
  //file
  const [imageUpload, setImageUpload] = useState(null);

  //ref for the file, which gets deleted upon choosing another img
  //preview of the uploaded img
  const [prev, setPrev] = useState(null);

  //ref for img
  const [uploadedRef, setUploadedRef] = useState(null);

  //upload
  const uploadImage = e => {
    if (imageUpload === null) return;
    const imgName = imageUpload.name + v4();
    setUploadedRef(imgName);
    handleChange({ name: "imgRef", value: imgName });
    // console.log("IMGREF----", imgRef);
    const imageRef = ref(storage, `images/${imgName}`);
    // setTest(imgName);
    uploadBytes(imageRef, imageUpload).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        console.log("File available at", url);
        setPrev(url);
      });
      console.log("ERROR? NO ERROR, THEN GOOD", snapshot);
    });
  };

  useEffect(() => {
    console.log("PREV", prev);
    console.log("IMG PATH", uploadedRef);
    console.log("IMG UPLOAD", imageUpload);
    console.log("IMG REF", imgRef);

    if (imgRef) {
      getDownloadURL(ref(storage, `images/${imgRef}`)).then(url => {
        setPrev(url);
      });
    }

    //check state, if not null, then upload
    if (imageUpload) {
      uploadImage();
    }
    //check state, delete if not null
  }, [imageUpload, isEditing]);

  const deleteImg = () => {
    const fetchedImgRef = ref(storage, `images/${uploadedRef || imgRef}`);

    deleteObject(fetchedImgRef)
      .then(() => {
        handleChange({ name: "imgRef", value: null });
        setPrev(null);
        setImageUpload(null);
        uploadedRef(null);
        console.log("img deleted");
      })
      .catch(error => {
        console.log("error in useEffect delete", error);
      });
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${addBg})` }} className="add-recipe">
        <div className="add-recipe-wrap">
          <form className="recipe-form">
            <div className="add-edit-wrap">
              <h2>{isEditing ? "Szerkesztés" : "Új recept"}</h2>
              {showAlert && <Alert />}
            </div>
            <div>
              {prev && (
                <div className="img-card-wrap">
                  <img crossOrigin="anonymous" src={prev} alt="" />
                </div>
              )}

              <div className="upload-label">
                {prev ? (
                  <BtnOne onClick={deleteImg} img={deleteIco} text={"Törlés"} />
                ) : (
                  <>
                    <label className="btnOne" htmlFor="files">
                      {/*TODO:ONLY SPAN WORKS WITH FILES*/}
                      {/* <div className="btn-one-wrap notBtn">
                    <span className="btnOne ">
                    {prev ? "Képcsere" : "Képfeltöltés"}
                    </span>
                  </div> */}
                      upload
                      <img src={uploadIco} alt="" />
                    </label>
                    <input
                      onChange={e => {
                        setImageUpload(e.target.files[0]);
                      }}
                      type="file"
                      accept="image/*"
                      id="files"
                      style={{ display: "none" }}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="add-input">
              <input
                type="text"
                placeholder="receptnév"
                name="title"
                value={title}
                onChange={handleRecipeInput}
              />
            </div>
            <div className="other-details-wrap">
              <div className="flex-end-wrap">
                <div className="icon-align">
                  <div className="add-icon">
                    <img src={difficultyIco} alt="" />
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
                    <img src={typeIco} alt="" />
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
                    <img src={timeIco} alt="" />
                  </div>
                  <div className="add-input">
                    <input
                      type="number"
                      placeholder="perc"
                      name="timeMinutesValue"
                      value={timeMinutesValue}
                      onChange={handleRecipeInput}
                    />
                  </div>
                  <div className="add-input time">
                    <input
                      type="number"
                      placeholder="óra"
                      name="timeHoursValue"
                      value={timeHoursValue}
                      onChange={handleRecipeInput}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*TODO:----ingredients----*/}
            <div className="multi-wrap">
              <div className="add-multi">
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
                          btnType={"button"}
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
                          btnType={"button"}
                        />
                      </div>
                    );
                  })}
              </div>
              {/*TODO:----STEP----*/}

              <div className="add-multi">
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
                          btnType={"button"}
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
                          btnType={"button"}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex-center-wrap">
              <BtnOne
                btnType={"submit"}
                onClick={handleSubmit}
                disabled={isLoading}
                text={"Kész"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRecipe;
