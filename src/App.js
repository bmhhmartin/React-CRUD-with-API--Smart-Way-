import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoute from './route/AppRoute';

const App = () => {
  return (
    <div>
        <Router>
          <AppRoute></AppRoute>
        </Router>
    </div>
  );
};

export default App;
