import { addPostValues } from "@rtk/slice/post/postSlice";
import { bgColors } from "@utils/staticData";
import { useDispatch } from "react-redux";

function ColorSelection() {
  const dipatch = useDispatch();
  return (
    <div className="modal-box-bg-colors">
      <ul>
        {bgColors.map((color, index) => (
          <li
            onClick={() => {
              dipatch(addPostValues({ bgColor: color }));
            }}
            data-testid="bg-colors"
            key={index}
            className={`${color === "#ffffff" ? "whiteColorBorder" : ""}`}
            style={{ backgroundColor: `${color}` }}
          ></li>
        ))}
      </ul>
    </div>
  );
}

export default ColorSelection;
