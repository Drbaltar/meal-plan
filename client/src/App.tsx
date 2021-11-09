import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App(): ReactElement {
  return (
    <div>
      <Link to="/recipes">Recipe List</Link>
      <Link to="/groceries">Grocery List</Link>
    </div>
  );
}

export default App;
