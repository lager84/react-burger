import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "../services/selectors";
import { URL_LOGIN, URL_ROOT } from "../utils/routes";
import Loader from "./loader/Loader";
import propTypes from "prop-types";

const ProtectedRoute = ({ onlyUnAuth = false, element }) => {
  const location = useLocation();
  const { requestStart, user } = useSelector(getAuth);

  if (requestStart) {
    return <Loader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: `${URL_ROOT}` } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={URL_LOGIN} state={{ from: location }} />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: propTypes.element.isRequired,
};

export default ProtectedRoute;
