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
    console.log('inside useEffect')
    const encoded = localStorage.getItem('AuthToken');
    if (encoded) {
      const token: JwtPayload = jwtDecode(encoded);
      console.log(token)
      if (token.exp && token.exp * 1000 < Date.now()) {
        window.location.href = '/login';
      } else {
        if (user?.userDetails?.userName) {
        } else {
          axios.defaults.headers.common['authorization'] = encoded;
          dispatch(setIsPassiveLoading(true));
          axios.get('/user')
            .then(result => {
              dispatch(setUserDetails(result.data));
            })
            .catch(() => {
              window.location.href = '/login';
            })
            .finally(() => {
              dispatch(setIsPassiveLoading(false));
            })
        }
      }
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