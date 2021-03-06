import { toJS } from 'mobx';
import React, { useEffect, useLayoutEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useRootStore } from '../../contexts/RootStoreProvider';

const PrivateRoute = ({ children, ...rest }) => {
  const history = useHistory();
  const { authStore, usersStore } = useRootStore();

  const inactivityTime = () => {
    let time;

    const resetTimer = () => {
      clearTimeout(time);
      time = setTimeout(() => {
        usersStore.updateAccountStatusOfUser(
          toJS(authStore.dataOfCurrentUser._id)
        );

        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert('Your account is deactivated for inactive');
          authStore.fetchSignOutRequest();
          history.push('/login');
        }, 1000);
      }, 30000);
    };

    window.onload = resetTimer;

    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;
  };

  useLayoutEffect(() => {
    if (window.location.pathname !== '/login') {
      window.onload = () => {
        inactivityTime();
      };
    }
  });

  useEffect(() => {
    const dataOfCurrentUser = toJS(authStore.dataOfCurrentUser);

    if (
      Object.keys(dataOfCurrentUser).length === 0 &&
      dataOfCurrentUser.constructor === Object
    ) {
      authStore.verifyMeRequest();
    }
  }, []);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (localStorage.getItem('token')) {
          if (location.pathname === '/') {
            return (
              <Redirect
                to={{
                  pathname: '/admin-panel',
                  state: { from: location }
                }}
              />
            );
          }

          return children;
        }

        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
