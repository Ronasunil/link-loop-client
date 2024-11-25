import useSWR from "swr";

import { swr } from "@services/api/swr/Swr";
import Button from "@components/button/Button";
import Avatar from "@components/avatar/Avatar";
import "./suggestions.scss";

function Suggestions() {
  const { data } = useSWR("/users/random", swr.fetcherGet);

  return (
    <div className="suggestions-list-container" data-testid="suggestions-container">
      <div className="suggestions-header">
        <div className="title-text">Suggestions</div>
      </div>
      <hr />
      <div className="suggestions-container">
        <div className="suggestions">
          {data?.users?.map((user, index) => (
            <div data-testid="suggestions-item" className="suggestions-item" key={index}>
              <Avatar imgSrc={user?.profileImg} size={50} />
              <div className="title-text">{user?.name}</div>
              <div className="add-icon">
                <Button label="Follow" className="button follow" disabled={false}>
                  Follow
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="view-more">View More</div>
      </div>
    </div>
  );
}

export default Suggestions;
