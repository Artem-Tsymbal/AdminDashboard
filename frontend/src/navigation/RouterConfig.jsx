import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './Auth/PrivateRoute';
import { Login } from '../pages/Login';
import { AdminPanel } from '../pages/AdminPanel';
import { DefaultLayout } from '../components/layouts/DefaultLayout';

export const RouterConfig = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <PrivateRoute path="/admin-panel">
      <DefaultLayout>
        <AdminPanel />
      </DefaultLayout>
    </PrivateRoute>
    <Route>
      <div className="message-empty">
        <div className="message-empty__title">
          404 Sorry, that page doesn’t exist!
        </div>
        <div className="message-empty__subtitle">
          We apologize for the inconvenience caused to you.
        </div>
      </div>
    </Route>
  </Switch>
);
