import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './users/pages/Users';
import NewContact from './contacts/pages/NewContact';
import UserContacts from './contacts/pages/UserContacts';
import UpdateContact from './contacts/pages/UpdateContact';
import Auth from './users/pages/Auth';
import AllContacts from './contacts/pages/AllContacts'; // Импортируйте новый компонент
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/contacts" exact>
          <AllContacts />
        </Route>
        <Route path="/:userId/contacts" exact>
          <UserContacts />
        </Route>
        <Route path="/contacts/new" exact>
          <NewContact />
        </Route>
        <Route path="/contacts/:contactId">
          <UpdateContact />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/contacts" exact>
          <AllContacts />
        </Route>
        <Route path="/:userId/contacts" exact>
          <UserContacts />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/contacts" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
