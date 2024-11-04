import PropTypes from "prop-types";

function Button({ children, onClick, className = "", disabled = false }) {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
