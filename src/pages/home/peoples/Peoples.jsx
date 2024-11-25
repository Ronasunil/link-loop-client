import Avatar from "@components/avatar/Avatar";
import CardElementStats from "@components/cardElementStats/CardElementStats";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Peoples.scss";
import CardElementButtons from "@components/cardElementButton/CardElementButton";
import { staticService } from "@utils/staticService";

import { useEffect, useState } from "react";
import { userService } from "@api/user/UserService";
import { useNavigate } from "react-router-dom";

function Peoples() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasmore] = useState(true);
  const navigate = useNavigate();
  const getUsers = async function (page) {
    try {
      setIsLoading(true);
      const res = await userService.getAllUsers(page);
      setIsLoading(false);
      console.log(res.data);
      if (res.data.users.length === 0) setHasmore(false);
      else setUsers((state) => [...state, ...res.data.users]);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const fetchMoreUsers = function () {
    if (hasMore && !isLoading) setPage((state) => state + 1);
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);

  return (
    <InfiniteScroll dataLength={users.length} next={fetchMoreUsers} hasMore={hasMore}>
      <div className="card-container">
        <div className="people">People</div>
        {users.length > 0 && (
          <div className="card-element">
            {users.map((data) => (
              <div className="card-element-item" key={data?._id} data-testid="card-element-item">
                <div className="card-element-header">
                  {/* <div className="card-element-header-bg"></div> */}
                  <div className="card-element-header-img">
                    <Avatar size={80} imgSrc={data?.profileImg} />
                  </div>
                  <div className="card-element-header-text">
                    <span className="card-element-header-name">{data?.userName}</span>
                  </div>
                </div>
                <CardElementStats
                  postsCount={data?.totalPost}
                  followersCount={data?.followersCount}
                  followingCount={data?.followeeCount}
                />
                <CardElementButtons
                  isChecked={staticService.checkUserIsFollowed([], data?._id)}
                  btnTextOne="Follow"
                  btnTextTwo="Unfollow"
                  onClickBtnOne={() => {}}
                  onClickBtnTwo={() => {}}
                  onNavigateToProfile={() => {
                    console.log(";");
                    navigate(`/app/profile/${data._id}`);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {isLoading && !users.length && <div className="card-element" style={{ height: "350px" }}></div>}

        {!isLoading && !users.length && (
          <div className="empty-page" data-testid="empty-page">
            No user available
          </div>
        )}
      </div>
    </InfiniteScroll>
  );
}

export default Peoples;
