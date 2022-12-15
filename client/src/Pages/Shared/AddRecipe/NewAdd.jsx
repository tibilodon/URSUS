import "./NewAddStyles.css";
import React from "react";
import { useState } from "react";
import Alert from "../../../Components/Alert/Alert";
import { useAppContext } from "../../../Context/appContext";
import { useNavigate } from "react-router-dom";
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
import MultipleInput from "../../../Components/Input/MultipleInput/MultipleInput";

const NewAdd = () => {
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
    const metadata = {
      contentType: "image/jpeg",
    };
    uploadBytes(imageRef, imageUpload, metadata).then(snapshot => {
      // alert("image uploaded");
      getDownloadURL(snapshot.ref).then(url => {
        // handleChange({ name: "imgURL", value: url });
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
  const [imgPath, setImgPath] = useState(null);

  useEffect(() => {
    if (imgRef) {
      // const storage = getStorage();
      // const imageRef = ref(storage, `images/${imgRef}`);
      getDownloadURL(ref(storage, `images/${imgRef}`)).then(url => {
        setImgPath(url);
      });
    }
    if (isEditing && imageUpload) {
      const fetchedImgRef = ref(storage, `images/${imgRef}`);

      deleteObject(fetchedImgRef)
        .then(() => {
          // console.log("img deleted");
        })
        .catch(error => {
          console.log("error isloading delete", error);
        });
    }
    //check state, if not null, then upload
    if (imageUpload) {
      uploadImage();
    }
    //check state, delete if not null
    if (delRef) {
      deleteObject(delRef)
        .then(() => {
          // console.log("DELETED");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [imageUpload]);

  return (
    <>
      <div>NewAdd</div>
      <div className="add-multiple">
        <MultipleInput />
      </div>
    </>
  );
};

export default NewAdd;
