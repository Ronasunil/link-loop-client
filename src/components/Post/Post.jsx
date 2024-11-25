import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@components/avatar/Avatar";
import PostCommentSection from "@components/postCommentSection/PostCommetnSection";
import { feelingsList, privacyList } from "@utils/staticData";
import { staticService } from "@utils/staticService";
import PropTypes from "prop-types";

import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { reactionService } from "@api/reaction/ReactionService";
import { addPostValues } from "@rtk/slice/post/postSlice";
import { openModal } from "@rtk/slice/modal/modalSlice";
import { deletePost } from "@rtk/slice/allPost/allPostSlice";
import { postService } from "@api/post/PostService";

function Post({ post, setIsCommentModalOpen, showIcons, setIsOpen }) {
  const { ref, inView, entry } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const dispatch = useDispatch();
  const [reaction, setReaction] = useState("");
  const [isReacted, setIsReacted] = useState(false);
  const { _id: userId } = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (inView && entry) {
      checkUserReacted(entry.target.dataset.postId, userId);
    }
  }, [inView, entry, userId]);

  const getFeeling = function (feelingName) {
    return feelingsList.find((feeling) => feeling.name === feelingName);
  };
  const getPrivacy = function (privacyName) {
    return privacyList.find((privacy) => privacy.topText.toLowerCase() === privacyName).icon;
  };

  const handleEditPost = function (post) {
    dispatch(openModal({ type: "edit" }));
    console.log(post.privacy);
    const postData = {
      bgColor: post.bgColor,
      postId: post._id,
      gifUrl: post?.gifUrl,
      content: post.content,
      feelings: post.feelings,
      privacy: post.privacy.toLowerCase() || "public",
      profilePic: post.profilePic,
      image:
        post?.imageId &&
        post?.imageVersion &&
        `${process.env.CLOUDINARY_BASE_URL}v${post.imageVersion}/${post.imageId}`,
    };
    dispatch(addPostValues(postData));
  };

  const handleDeletePost = async function (post) {
    const res = await postService.deletePost(post._id);
    console.log(res);
    if (res.status !== 204) return staticService.displayActivityNotification(`Can't delete post`, "error");
    dispatch(deletePost({ id: post._id }));
    staticService.displayActivityNotification("Deleted post", "success");
  };

  async function checkUserReacted(postId, userId) {
    const res = await reactionService.checkPostIsReacted(postId, userId);

    setReaction(res.data.reaction?.reactionType ?? "");
    setIsReacted(res.data.reaction !== null ? true : false);
  }

  const PrivacyIcon = getPrivacy(post?.privacy);

  return (
    <>
      <div data-post-id={post._id} className="post-body" data-testid="post" ref={ref}>
        <div className="user-post-data">
          <div className="user-post-data-wrap">
            <div className="user-post-image">
              <Avatar size={70} imgSrc={post?.profilePic} />
            </div>
            <div className="user-post-info">
              <div className="inline-title-display">
                <h5 data-testid="username">
                  {post?.username}
                  {post?.feelings && (
                    <div className="inline-display" data-testid="inline-display">
                      is feeling <img className="feeling-icon" src={getFeeling(post?.feelings).image} alt="" />{" "}
                      <div>{post?.feelings}</div>
                    </div>
                  )}
                </h5>
                {showIcons && post?.userId === userId && (
                  <div className="post-icons" data-testid="post-icons">
                    <FaPencilAlt onClick={() => handleEditPost(post)} className="pencil" />
                    <FaRegTrashAlt onClick={() => handleDeletePost(post)} className="trash" />
                  </div>
                )}
              </div>

              {post?.createdAt && (
                <p className="time-text-display" data-testid="time-display">
                  {staticService.getTimeDifference(post.createdAt)} &middot;{" "}
                  <PrivacyIcon className="globe-icon globe" />
                </p>
              )}
            </div>
            <hr />
            <div className="user-post" style={{ marginTop: "1rem", borderBottom: "" }}>
              {post?.content && post?.bgColor === "#ffffff" && (
                <p style={{ color: "#000" }} className="post" data-testid="user-post">
                  {post?.content}
                </p>
              )}
              {post?.content && post?.bgColor !== "#ffffff" && (
                <div
                  data-testid="user-post-with-bg"
                  className="user-post-with-bg"
                  style={{ backgroundColor: `${post?.bgColor}` }}
                >
                  {post?.content}
                </div>
              )}

              {post?.imageId && !post?.gifUrl && (
                <div data-testid="post-image" className="image-display-flex">
                  <img
                    className="post-image"
                    src={`${process.env.CLOUDINARY_BASE_URL}v${post.imageVersion}/${post.imageId}`}
                    alt=""
                  />
                </div>
              )}

              {post?.gifUrl && !post?.imageId && (
                <div className="image-display-flex">
                  <img className="post-image" src={`${post?.gifUrl}`} alt="" />
                </div>
              )}
              {(post?.reactions.length > 0 || post?.commentsCount > 0) && <hr />}
              <PostCommentSection
                isReacted={isReacted}
                setIsOpen={setIsOpen}
                setIsCommentModalOpen={setIsCommentModalOpen}
                setReaction={setReaction}
                reaction={reaction}
                post={post}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Post.displayName = "Post";

Post.propTypes = {
  post: PropTypes.object.isRequired,
  showIcons: PropTypes.bool,
  reaction: PropTypes.string,
  setIsOpen: PropTypes.func,
  setIsCommentModalOpen: PropTypes.func,
};

export default Post;
