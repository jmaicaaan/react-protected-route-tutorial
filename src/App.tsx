import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';

import { AdminDashboard } from './containers/AdminDashboard';
import { Dashboard } from './containers/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

import { AdminGuard } from './guards/admin-guard';

const App = () => {
  useEffect(() => {
    // Mocking the local storage to have a user data
    const user = {
      firstName: 'JM',
      lastName: 'Santos',
      roles: ['basic'],
    };
    window.localStorage.setItem('user', JSON.stringify(user));
  }, []);

  return (
    <Router>
      <div className="App">
        Welcome to ProtectedRoute with Guard functions tutorial
        <Switch>
          <ProtectedRoute
            path="/admin"
            guards={[AdminGuard]}
            fallback={() => <Redirect to="/home" />}
          >
            <AdminDashboard />
          </ProtectedRoute>
          <Route path="/home">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
