import "./CardStyles.css";
import { useState, useEffect } from "react";
import time from "../../Assets/time.svg";
import difficultyIco from "../../Assets/difficulty.svg";
import recType from "../../Assets/rec-type.svg";
import CardModal from "../Modal/CardModal";
import { useAppContext } from "../../Context/appContext";
//moment
import moment from "moment";
import "moment/locale/hu";
//firebase
import { storage } from "../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const MemberCard = ({ recipe }) => {
  const {
    _id,
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
  const { setEditRecipe, deleteRecipe } = useAppContext();
  //moments - date
  moment.locale("hu");
  let date = moment(createdAt);
  date = date.format("l");

  //modal
  const [modal, setModal] = useState(false);
  const modalHandler = e => {
    e.preventDefault();
    setModal(!modal);
  };

  const edit = true;

  //firebase ref
  const [imgPath, setImgPath] = useState(null);
  const storage = getStorage();

  useEffect(() => {
    if (imgRef) {
      getDownloadURL(ref(storage, `images/${imgRef}`)).then(url => {
        setImgPath(url);
      });
    }
  }, [imgRef]);

  return (
    <div
      onClick={modalHandler}
      // style={{ backgroundImage: `url(${imgPath})` }}
      className="card-sizer"
    >
      <img
        crossOrigin="anonymous"
        className="sizer-img"
        src={imgPath && imgPath}
        alt=""
      />
      <CardModal
        modal={modal}
        // onClose={handleModal}
        title={title}
        _id={_id}
        steps={steps}
        difficulty={difficulty}
        ingredients={ingredients}
        recipeType={recipeType}
        timeMinutesValue={timeMinutesValue}
        timeHoursValue={timeHoursValue}
        edit={edit}
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

export default MemberCard;
