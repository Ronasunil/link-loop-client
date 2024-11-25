import { feelingsList } from "@utils/staticData";
import "./feelings.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleFeelingModel } from "@rtk/slice/modal/modalSlice";
import { addPostValues } from "@rtk/slice/post/postSlice";

const Feelings = () => {
  const dispatch = useDispatch();
  const { feelingModalIsOpen } = useSelector((state) => state.modal);

  const handleFeeling = (feeling) => {
    dispatch(addPostValues({ feelings: feeling.name }));
    dispatch(toggleFeelingModel({ feelingModalIsOpen: !feelingModalIsOpen }));
  };
  return (
    <div className="feelings-container">
      <div className="feelings-container-picker">
        <p>Feelings</p>
        <hr />
        <ul className="feelings-container-picker-list">
          {feelingsList.map((feeling) => (
            <li
              onClick={() => handleFeeling(feeling)}
              data-testid="feelings-item"
              className="feelings-container-picker-list-item"
              key={feeling.index}
            >
              <img src={feeling.image} alt="" /> <span>{feeling.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Feelings;
