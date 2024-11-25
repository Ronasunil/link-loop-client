import { useDispatch, useSelector } from "react-redux";

import Avatar from "@components/avatar/Avatar";
import Input from "@components/input/Input";

import feeling from "@assets/images/feeling.png";
import gif from "@assets/images/gif.png";
import photo from "@assets/images/photo.png";

import "./postForm.scss";
import { openModal } from "@rtk/slice/modal/modalSlice";
import AddPostForm from "@components/addPostform/AddPostForm";
import EditPostForm from "@components/editPostForm/EditPostForm";

function PostForm() {
  const { profileImg } = useSelector((state) => state.user.profile);
  const { modalIsOpen, type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      <div className="post-form" data-testid="post-form">
        <div className="post-form-row">
          <div className="post-form-header">
            <h4 className="post-form-title">Create Post</h4>
          </div>
          <div className="post-form-body" onClick={() => dispatch(openModal({ type: "add" }))}>
            <div className="post-form-input-body" data-testid="input-body">
              <Avatar imgSrc={profileImg} size={60} />
              <div className="post-form-input" data-placeholder="Write something here..."></div>
            </div>
            <hr />
            <ul className="post-form-list" data-testid="list-item">
              <li className="post-form-list-item image-select">
                <Input onChange={() => {}} name="image" type="file" id="file-input" className="file-input" />
                <label htmlFor="file-input">
                  <img height={"28px"} src={photo} alt="" />
                </label>
                <span>Photo</span>
              </li>
              <li className="post-form-list-item">
                <img src={gif} alt="" /> Gif
              </li>
              <li className="post-form-list-item">
                <img src={feeling} alt="" /> Feeling
              </li>
            </ul>
          </div>
        </div>
      </div>

      {modalIsOpen && type === "add" && <AddPostForm />}
      {modalIsOpen && type === "edit" && <EditPostForm />}
    </>
  );
}

export default PostForm;
