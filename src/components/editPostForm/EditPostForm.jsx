import { useDispatch, useSelector } from "react-redux";

import PostWrapper from "@components/postWrapper/PostWrapper";

import "./editPostForm.scss";
import ModalBoxContent from "@components/modalBoxContent/ModalBoxContent";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ColorSelection from "@components/colorSelection.jsx/ColorSelection";
import ModalBoxSelection from "@components/modalBoxSelection/ModalBoxSelection";
import Button from "@components/button/Button";

import { closeModal } from "@rtk/slice/modal/modalSlice";
import { addPostValues, clearPost } from "@rtk/slice/post/postSlice";
import Gif from "@components/gif/Gif";
import { postUtils } from "@utils/PostUtils";

function EditPostForm() {
  const { gifModalIsOpen } = useSelector((state) => state.modal);
  const [allowedChar, setAllowedChar] = useState("0/100");
  const post = useSelector((state) => state.post.post);
  const dispatch = useDispatch();
  const editableRef = useRef(null);

  // fn
  const closeEditFormModal = () => {
    dispatch(closeModal());
    dispatch(clearPost());
  };

  // const deletePostImg = () => {
  //   dispatch(deleteImg());
  //   dispatch(addPostValues({ gifUrl: "" }));
  //   setPostImg("");
  // };

  const handleTextChange = (e) => {
    const text = e.target.innerText;

    setAllowedChar(`${text.length}/100`);
    console.log(text);
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

  const handleEditPost = async () => {
    postUtils.editPost(post);
    closeEditFormModal();
  };
  useEffect(() => {
    if (post.content) setCursorToEnd();
  }, [post?.content]);
  console.log(post);
  return (
    <PostWrapper closeModal={closeEditFormModal}>
      {!gifModalIsOpen && (
        <div onClick={(e) => e.stopPropagation()} className="modal-box">
          <div className="modal-box-header">
            <h2>Edit Post</h2>
            <button onClick={closeEditFormModal} className="modal-box-header-cancel">
              X
            </button>
          </div>
          <hr />
          <ModalBoxContent />

          {!post.image && !post.gifUrl && (
            <div className="modal-box-form" data-testid="modal-box-form">
              <div className="main">
                <div className="flex-row">
                  <div
                    ref={editableRef}
                    onKeyUp={handleTextChange}
                    onKeyDown={preventInput}
                    onInput={handleTextChange}
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
                    {post.content}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(post.image || post.gifUrl) && (
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
                onInput={handleTextChange}
              >
                {post.content}
              </div>
              <div className="image-display">
                {/* <div onClick={deletePostImg} className="image-delete-btn" data-testid="image-delete-btn">
                  <FaTimes />
                </div> */}
                <img data-testid="post-image" className="post-image" src={post.image || post.gifUrl} alt="" />
              </div>
            </div>
          )}
          <ColorSelection />
          <span className="char_count" data-testid="allowed-number">
            {allowedChar}
          </span>
          <ModalBoxSelection edit={true} />
          <div className="modal-box-button" data-testid="post-button">
            <Button onClick={handleEditPost} className="post-button">
              {post.isLoading ? "Editing..." : "Edit post"}
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

export default EditPostForm;
