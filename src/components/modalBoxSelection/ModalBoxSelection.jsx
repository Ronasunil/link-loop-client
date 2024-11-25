import PropTypes from "prop-types";

import feeling from "@assets/images/feeling.png";
import gif from "@assets/images/gif.png";
import photo from "@assets/images/photo.png";
import { addPostValues } from "@rtk/slice/post/postSlice";
import { staticService } from "@utils/staticService";
import { useDispatch, useSelector } from "react-redux";
import Feelings from "@components/feelings/Feelings";
import { useRef } from "react";
import useOutsideClick from "@hooks/useOutsideClick";
import { toggleFeelingModel, toggleGifModal } from "@rtk/slice/modal/modalSlice";

function ModalBoxSelection({ setPostImg, edit = false }) {
  const dispatch = useDispatch();
  const feelingsRef = useRef(null);
  const { feelingModalIsOpen } = useSelector((state) => state.modal);
  const { gifModalIsOpen } = useSelector((state) => state.modal);
  const [isOpen, setIsOpen] = useOutsideClick(feelingsRef, feelingModalIsOpen);

  const handleImageSelection = async function (e) {
    const files = e.target.files;
    console.log(e.target.result);
    if (!files || !files?.length) return;

    const base64Img = await staticService.processImg(files[0]);
    setPostImg(base64Img);
    dispatch(addPostValues({ image: base64Img }));
  };

  return (
    <>
      {feelingModalIsOpen && (
        <div ref={feelingsRef}>
          <Feelings />
        </div>
      )}
      <div className="modal-box-selection" data-testid="modal-box-selection">
        <ul className="post-form-list" data-testid="list-item">
          {!edit && (
            <>
              <li className="post-form-list-item image-select">
                <label
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  htmlFor="image-upload"
                >
                  <img src={photo} alt="" />
                  <span>Photo</span>
                </label>
                <input
                  onChange={handleImageSelection}
                  id="image-upload"
                  name="image"
                  type="file"
                  accept="image/*"
                  style={{ width: "0px" }}
                />
              </li>
              <li onClick={() => dispatch(toggleGifModal({ gifModalIsOpen: true }))} className="post-form-list-item">
                <img src={gif} alt="" /> Gif
              </li>
            </>
          )}
          <li
            onClick={() => {
              setIsOpen((state) => !state);
              dispatch(toggleFeelingModel({ feelingModalIsOpen: !feelingModalIsOpen }));
            }}
            className="post-form-list-item"
          >
            <img src={feeling} alt="" /> Feeling
          </li>
        </ul>
      </div>
    </>
  );
}

export default ModalBoxSelection;

ModalBoxSelection.propTypes = {
  setPostImg: PropTypes.func,
  edit: PropTypes.bool,
};
