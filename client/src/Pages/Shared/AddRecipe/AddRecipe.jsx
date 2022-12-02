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
    imgURL,
  } = useAppContext();

  // const [load, setLoad] = useState(false);

  // const handleThings = e => {
  //   setLoad(true);
  //   uploadImage();

  //   handleSubmit(e);
  //   setLoad(false);
  // };

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
  const [delRef, setDelRef] = useState(null);
  //preview of the uploaded img
  const [prev, setPrev] = useState(null);

  //upload
  const uploadImage = () => {
    if (imageUpload === null) return;
    const imgName = imageUpload.name + v4();
    handleChange({ name: "imgRef", value: imgName });

    const imageRef = ref(storage, `images/${imgName}`);
    setDelRef(imageRef);
    // console.log("imgREF", imageRef);
    // const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    uploadBytes(imageRef, imageUpload).then(snapshot => {
      // alert("image uploaded");
      getDownloadURL(snapshot.ref).then(url => {
        handleChange({ name: "imgURL", value: url });
        // console.log(typeof url);
        // setImageList(prev => [...prev, url]);
        setPrev(url);
      });
    });
  };
  //retrieve ALL img
  // const [imageList, setImageList] = useState([]);
  // // setting ref for all images in the folder
  // const imageListRef = ref(storage, "images/");
  // useEffect(() => {
  //   listAll(imageListRef).then(response => {
  //     // console.log(response);
  //     response.items.forEach(item => {
  //       getDownloadURL(item).then(url => {
  //         // setImageList(prev => [...prev, url]);
  //         setImageList([url]);
  //       });
  //     });
  //   });
  //   // console.log(imageList);
  // }, []);

  // if (load) {
  //   return <h1>LOADING</h1>;
  // }

  useEffect(() => {
    console.log(fetchedIngredient.length, ingredients.length);
    //check state, if not null, then upload
    if (imageUpload) {
      uploadImage();
    }
    //check state, delete if not null
    if (delRef) {
      deleteObject(delRef)
        .then(() => {
          console.log("DELETED");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [imageUpload]);

  if (isEditing) {
  }

  return (
    <>
      <div className="add-recipe">
        <div className="add-recipe-wrap">
          <form className="recipe-form">
            <div className="add-edit-wrap">
              <h2>{isEditing ? "Szerkesztés" : "Új recept"}</h2>
              {showAlert && <Alert />}
            </div>
            <div>
              <input
                onChange={e => setImageUpload(e.target.files[0])}
                type="file"
              />
              {/* <button onClick={uploadImage}>upload img</button> */}
              {/* {imageList.map((url, i) => {
              return <img style={{ width: "4em" }} key={i} src={url} />;
            })} */}
              {prev && <img style={{ width: "4em" }} src={prev} />}
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
                {/* {isEditing && ingredients.length < 1
                  ? ingredient.map((ings, i) => {
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
                    })
                  : fetchedIngredient.map((ing, i) => {
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
                    })} */}
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
