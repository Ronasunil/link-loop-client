import PropTypes from "prop-types";

import { useCurrentUser } from "@hooks/useCurrentUser";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { deleteUser } from "@rtk/slice/user/userSlice";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { error, isLoading, user } = useCurrentUser();
  const dispatch = useDispatch();
  const [remove] = useLocalStorage("user");

  if ((error || !user) && !isLoading) {
    remove();
    dispatch(deleteUser());
    return <Navigate replace={true} to="/" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
