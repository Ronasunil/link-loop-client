import PropTypes from "prop-types";

import "./input.scss";

function Input({
  label,
  placeholder,
  type,
  value = "",
  labelText,
  id,
  name,
  className,
  onChange,
}) {
  return (
    <div className="form-row">
      {label && (
        <label className="form-label" htmlFor={label}>
          {labelText}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        id={id}
        onChange={onChange}
        className={!className && "form-input"}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  labelText: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.any,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
