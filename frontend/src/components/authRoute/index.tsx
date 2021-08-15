import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import jwtDecode, { JwtPayload } from 'jwt-decode';


import { useAppDispatch, useAppSelector } from '../../store/hooks';
import axios from 'axios';
import { setUserDetails } from '../../store/userReducer';
import { setIsPassiveLoading } from '../../store/uiReducer';


const MerpRoutes = ({ component: Component, ...rest }: { component: any }): React.ReactElement => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user);
  useEffect(() => {
    const encoded = localStorage.getItem('AuthToken');
    // I have a token
    if (encoded) {
      const token: JwtPayload = jwtDecode(encoded);
      // The token is expired
      if (token.exp && token.exp * 1000 < Date.now()) {
        window.location.href = '/login';
        // the token is fine
      } else {
        // There is no user details
        if (!user?.userDetails?.userName) {
          axios.defaults.headers.common['authorization'] = encoded;
          dispatch(setIsPassiveLoading(true));
          axios.get('/user')
            .then(result => {
              dispatch(setUserDetails(result.data));
            })
            // Fetch user fails
            .catch(() => {
              window.location.href = '/login';
            })
            .finally(() => {
              dispatch(setIsPassiveLoading(false));
            })
        }
      }
    } else {
      window.location.href = '/login';
    }
  }, []);


  return (
    <Route
      {...rest}
      render={(props) => (<Component {...props} />)
      }
    />
  );
}
export default MerpRoutes;