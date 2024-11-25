import { useDispatch, useSelector } from "react-redux";

import PostWrapper from "@components/postWrapper/PostWrapper";

import "./addPostForm.scss";
import ModalBoxContent from "@components/modalBoxContent/ModalBoxContent";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import ColorSelection from "@components/colorSelection.jsx/ColorSelection";
import ModalBoxSelection from "@components/modalBoxSelection/ModalBoxSelection";
import Button from "@components/button/Button";

import { closeModal } from "@rtk/slice/modal/modalSlice";
import { addPostValues, clearPost, deleteImg } from "@rtk/slice/post/postSlice";
import Gif from "@components/gif/Gif";
import { postUtils } from "@utils/PostUtils";

function AddPostForm() {
  const { gifModalIsOpen } = useSelector((state) => state.modal);
  const [allowedChar, setAllowedChar] = useState("0/100");
  const [postImg, setPostImg] = useState("");
  const post = useSelector((state) => state.post.post);
  const user = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();
  const editableRef = useRef(null);

  // fn
  const closeAddFormModal = () => {
    dispatch(closeModal());
    dispatch(clearPost());
  };

  const deletePostImg = () => {
    dispatch(deleteImg());
    dispatch(addPostValues({ gifUrl: "" }));
    setPostImg("");
  };

  const handleTextChange = (e) => {
    const text = e.target.innerText;

    setAllowedChar(`${text.length}/100`);
    dispatch(addPostValues({ content: text }));
  };

  const preventInput = (e) => {
    const text = e.target.innerText;
    if (text.length === 100 && e.keyCode !== 8) e.preventDefault();
  };

  const setCursorToEnd = () => {
    const editableElement = editableRef.current;
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(editableElement);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleAddPost = async () => {
    await postUtils.createPost(post, user, dispatch);
    dispatch(closeAddFormModal());
  };

  useEffect(() => {
    setCursorToEnd();
  }, [post.text]);

  return (
    <PostWrapper closeModal={closeAddFormModal}>
      {!gifModalIsOpen && (
        <div onClick={(e) => e.stopPropagation()} className="modal-box">
          <div className="modal-box-header">
            <h2>Create Post</h2>
            <button onClick={closeAddFormModal} className="modal-box-header-cancel">
              X
            </button>
          </div>
          <hr />
          <ModalBoxContent />

          {!postImg && !post.gifUrl && (
            <div className="modal-box-form" data-testid="modal-box-form">
              <div className="main">
                <div className="flex-row">
                  <div
                    ref={editableRef}
                    onKeyUp={handleTextChange}
                    onKeyDown={preventInput}
                    onInput={(e) => {
                      handleTextChange(e);
                    }}
                    data-testid="editable"
                    id="editable"
                    name="post"
                    className={`editable flex-item ${
                      post.bgColor !== "#ffffff" && post.bgColor !== "" ? "textInputColor" : ""
                    }`}
                    contentEditable={true}
                    data-placeholder="What's on your mind?..."
                    style={{ backgroundColor: post.bgColor }}
                  >
                    {post.text}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(postImg || post.gifUrl) && (
            <div className="modal-box-image-form">
              <div
                data-testid="post-editable"
                name="post"
                id="editable"
                className="post-input flex-item"
                contentEditable={true}
                data-placeholder="What's on your mind?..."
                ref={editableRef}
                onKeyUp={handleTextChange}
                onKeyDown={preventInput}
                onInput={(e) => {
                  handleTextChange(e);
                }}
              >
                {post.text}
              </div>
              <div className="image-display">
                <div onClick={deletePostImg} className="image-delete-btn" data-testid="image-delete-btn">
                  <FaTimes />
                </div>
                <img data-testid="post-image" className="post-image" src={postImg || post.gifUrl} alt="" />
              </div>
            </div>
          )}
          <ColorSelection />
          <span className="char_count" data-testid="allowed-number">
            {allowedChar}
          </span>
          <ModalBoxSelection setPostImg={setPostImg} />
          <div className="modal-box-button" data-testid="post-button">
            <Button onClick={handleAddPost} className="post-button">
              {post.isLoading ? "Creating..." : "Create post"}
            </Button>
          </div>
        </div>
      )}

      {gifModalIsOpen && (
        <div className="modal-giphy" data-testid="modal-giphy">
          <div className="modal-giphy-header">
            <Button label={<FaArrowLeft />} className="back-button" disabled={false} />
            <h2>Choose a GIF</h2>
          </div>
          <hr />
          <Gif />
        </div>
      )}
    </PostWrapper>
  );
}

export default AddPostForm;
