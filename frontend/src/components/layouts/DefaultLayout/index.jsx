import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useRootStore } from '../../../contexts/RootStoreProvider';
import './index.scss';

export const DefaultLayout = ({ children }) => {
  const history = useHistory();
  const { authStore } = useRootStore();

  const onSignOut = () => {
    authStore.fetchSignOutRequest();
    history.push('/login');
  };

  return (
    <div className="defaultLayout">
      <header className="defaultLayout__header">
        <nav className="defaultLayout-nav">
          <div className="defaultLayout-nav__item">
            <Link to="/home">Home</Link>
          </div>

          <div className="defaultLayout-nav__item">
            <Link to="/admin-panel">Admin Panel</Link>
          </div>

          <div className="defaultLayout-nav__item">
            <button type="button" onClick={onSignOut}>
              Sign Out
            </button>
          </div>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
};
