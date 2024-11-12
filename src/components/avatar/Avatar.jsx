import PropTypes from "prop-types";
import "./avatar.scss";

function Avatar({ imgSrc, size }) {
  return (
    <>
      <img
        src={imgSrc}
        alt="avatar image"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
        }}
      />
    </>
  );
}

Avatar.propTypes = {
  size: PropTypes.number,
  imgSrc: PropTypes.string,
};

export default Avatar;
