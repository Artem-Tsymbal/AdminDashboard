/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/named */
import React, { useContext, createContext } from 'react';
import AuthStore from '../store/authStore';
import UsersStore from '../store/usersStore';

const authStore = new AuthStore();
const usersStore = new UsersStore();

const RootStoreContext = createContext({});

export const RootStoreProvider = ({ children }) => (
  <RootStoreContext.Provider value={{ authStore, usersStore }}>
    {children}
  </RootStoreContext.Provider>
);

export const useRootStore = () => useContext(RootStoreContext);
