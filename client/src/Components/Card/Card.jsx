import "./CardStyles.css";
import { useState, useEffect } from "react";
import time from "../../Assets/time.svg";
import difficultyIco from "../../Assets/difficulty.svg";
import recType from "../../Assets/rec-type.svg";
import CardModal from "../Modal/CardModal";
//moment
import moment from "moment";
import "moment/locale/hu";
//firebase
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";

const Card = ({ recipe }) => {
  const {
    title,
    recipeType,
    difficulty,
    createdAt,
    timeMinutesValue,
    timeHoursValue,
    steps,
    ingredients,
    imgRef,
  } = recipe;
  //moment
  moment.locale("hu");
  let date = moment(createdAt);
  date = date.format("l");
  //modal
  const [modal, setModal] = useState(false);
  const modalHandler = e => {
    e.preventDefault();
    setModal(!modal);
  };
  //firebase ref
  const [imgPath, setImgPath] = useState(null);

  useEffect(() => {
    if (imgRef) {
      getDownloadURL(ref(storage, `images/${imgRef}`)).then(url => {
        setImgPath(url);
      });
    }
  }, [imgRef]);
  return (
    <div onClick={modalHandler} className="card-sizer">
      <div className="card-img-wrap-div">
        <img
          crossOrigin="anonymous"
          className="sizer-img"
          src={imgPath && imgPath}
          alt=""
        />
      </div>
      <CardModal
        modal={modal}
        title={title}
        steps={steps}
        difficulty={difficulty}
        ingredients={ingredients}
        recipeType={recipeType}
        timeMinutesValue={timeMinutesValue}
        timeHoursValue={timeHoursValue}
        imgPath={imgPath}
      />
      <div className="card-details">
        <div className="card-upper">
          <div className="card-difficulty">
            <img className="card-ico" src={difficultyIco} alt="" />
            <h1>{difficulty}</h1>
          </div>
          <div className="card-type">
            <img className="card-ico" src={recType} alt="" />
            <h1>{recipeType}</h1>
          </div>
        </div>
        <div className="card-downer">
          <div className="card-title">
            <h1>{title}</h1>
          </div>

          {(timeHoursValue || timeMinutesValue) && (
            <div className="card-time">
              <img className="card-ico" src={time} alt="" />
              <div>
                {timeHoursValue && <h1>{timeHoursValue} óra</h1>}
                {timeMinutesValue && <h1>{timeMinutesValue} perc</h1>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
