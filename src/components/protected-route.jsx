import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { authGetUserAction } from '../services/actions/auth';
import { getAuth } from '../services/selectors';
import { URL_LOGIN } from '../utils/routes';
import Loader from './loader/Loader';
import propTypes from 'prop-types';

const ProtectedRoute = ({ onlyUnAuth = false, element }) => {

    const location = useLocation();
    const { requestStart, userLoggedIn, user } = useSelector(getAuth);
    const dispatch = useDispatch();



    if (requestStart) {
        return <Loader />;
    }

    if (userLoggedIn && user.name === "") {
        if (user.name === "") {
            dispatch(authGetUserAction());
        }
        const { from } = location.state || { from: { pathname: location.pathname } };
        return <Navigate to={from} />
    }

    if (!userLoggedIn) {
        return (
            <Navigate to={URL_LOGIN}
                state={{ from: location }}
            />
        );
    }

    return element

}


ProtectedRoute.propTypes = {
    element: propTypes.element.isRequired
}

export default ProtectedRoute;