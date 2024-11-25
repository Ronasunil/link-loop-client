import Button from "@components/button/Button";
import PropTypes from "prop-types";
import { Fragment } from "react";
function CardElementButtons({ isChecked, btnTextOne, btnTextTwo, onClickBtnOne, onClickBtnTwo, onNavigateToProfile }) {
  console.log(isChecked);
  return (
    <div className="card-element-buttons" data-testid="card-element-buttons">
      <Fragment>
        {!isChecked && (
          <Button className="card-element-buttons-btn button" onClick={onClickBtnOne}>
            {btnTextOne}
          </Button>
        )}
        {isChecked && (
          <Button className="card-element-buttons-btn button isUserFollowed" onClick={onClickBtnTwo}>
            {btnTextTwo}
          </Button>
        )}
      </Fragment>
      <Button className="card-element-buttons-btn button" onClick={onNavigateToProfile}>
        Profile
      </Button>
    </div>
  );
}
CardElementButtons.propTypes = {
  isChecked: PropTypes.bool,
  btnTextOne: PropTypes.string,
  btnTextTwo: PropTypes.string,
  onClickBtnOne: PropTypes.func,
  onClickBtnTwo: PropTypes.func,
  onNavigateToProfile: PropTypes.func,
};
export default CardElementButtons;
