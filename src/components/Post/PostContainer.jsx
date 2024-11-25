import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { postUtils } from "@utils/PostUtils";
import Post from "./Post";
import "./post.scss";
import PostSocket from "@socket/PostSocket";
import { useDispatch, useSelector } from "react-redux";
import { initPost } from "@rtk/slice/allPost/allPostSlice";
import ReactionsModal from "@components/reactionModal/ReactionModal";
import useOutsideClick from "@hooks/useOutsideClick";
import CommentModal from "@components/CommentModal/CommentModal";

function PostContainer() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.allPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const reactionsRef = useRef(null);
  const commentRef = useRef(null);
  const [isOpen, setIsOpen] = useOutsideClick(reactionsRef, false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useOutsideClick(commentRef, false);

  useEffect(() => {
    new PostSocket();
  }, []);

  async function getPosts(page) {
    setIsLoading(true);
    const res = await postUtils.getPosts(page);
    setIsLoading(false);
    if (!res.data.posts.length) {
      setHasMore(false);
    } else {
      dispatch(initPost({ posts: [...posts, ...res.data.posts] }));
    }
  }

  function fetchMorePost() {
    if (!isLoading && hasMore) setPage((page) => page + 1);
  }

  useEffect(() => {
    getPosts(page);
  }, [page]);
  console.log();
  return (
    <>
      <ReactionsModal isOpen={isOpen} ref={reactionsRef} />
      <CommentModal isCommentModalOpen={isCommentModalOpen} ref={commentRef} />
      <InfiniteScroll
        dataLength={posts.length}
        hasMore={hasMore}
        height={"100vh"}
        loader={<h4>Loading...</h4>}
        next={fetchMorePost}
      >
        {posts.map((post, i) => {
          return (
            <div key={i}>
              <Post setIsCommentModalOpen={setIsCommentModalOpen} setIsOpen={setIsOpen} post={post} showIcons={true} />
            </div>
          );
        })}
      </InfiniteScroll>
    </>
  );
}

export default PostContainer;
