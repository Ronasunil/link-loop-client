import PropTypes from "prop-types";

function CardElementStats({ postsCount, followersCount, followingCount }) {
  return (
    <div className="card-element-stats">
      <div className="card-element-stats-group">
        <p className="card-element-stats-group-title">Posts</p>
        <h5 className="card-element-stats-group-info" data-testid="info">
          {postsCount}
        </h5>
      </div>
      <div className="card-element-stats-group">
        <p className="card-element-stats-group-title">Followers</p>
        <h5 className="card-element-stats-group-info" data-testid="info">
          {followersCount}
        </h5>
      </div>
      <div className="card-element-stats-group">
        <p className="card-element-stats-group-title">Following</p>
        <h5 className="card-element-stats-group-info" data-testid="info">
          {followingCount}
        </h5>
      </div>
    </div>
  );
}
CardElementStats.propTypes = {
  postsCount: PropTypes.number,
  followersCount: PropTypes.number,
  followingCount: PropTypes.number,
};
export default CardElementStats;
