import "./CardModalStyles.css";
import bread from "../../Assets/bread.jpg";
import time from "../../Assets/time.svg";
import difficultyIco from "../../Assets/difficulty.svg";
import recType from "../../Assets/rec-type.svg";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/appContext";

const CardModal = ({
  title,
  modal,
  onClose,
  _id,
  steps,
  difficulty,
  recipeType,
  timeHoursValue,
  timeMinutesValue,
  ingredients,
  // edit,
  imgPath,
}) => {
  const { setEditRecipe, deleteRecipe } = useAppContext();
  return (
    <>
      <div className={modal ? "modal-wrap " : "modal-off"}>
        <div className="modal-sizer">
          <div
            crossOrigin="anonymous"
            style={{ backgroundImage: `url(${imgPath})` }}
            className="modal-img"
          >
            {/* <img src={bread} alt="" /> */}
            <div className="modal-title">
              <h1>{title}</h1>
            </div>
          </div>
          <div className="modal-icons">
            <div className="modal-difficulty">
              <img className="modal-ico" src={difficultyIco} alt="" />
              <h1>{difficulty}</h1>
            </div>
            <div className="modal-type">
              <img className="modal-ico" src={recType} alt="" />
              <h1>{recipeType}</h1>
            </div>

            {(timeHoursValue || timeMinutesValue) && (
              <div className="modal-time">
                <img className="modal-ico" src={time} alt="" />
                {timeHoursValue && <h1>{timeHoursValue} óra</h1>}

                {timeMinutesValue && <h1>{timeMinutesValue} perc</h1>}
              </div>
            )}
          </div>
          <div className="ings">
            <h1>Hozzávalók:</h1>
            {ingredients &&
              ingredients.map((item, i) => {
                return (
                  <ul key={i}>
                    <li>{item}</li>
                  </ul>
                );
              })}
          </div>{" "}
          <div className="ings modal-steps">
            <h1>Elkészítés:</h1>
            {steps &&
              steps.map((item, i) => {
                return (
                  <ul key={i}>
                    <li>
                      {" "}
                      {i + 1}. lépés: {item}
                    </li>
                  </ul>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardModal;
