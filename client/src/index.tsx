import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GroceryList from './Components/GroceryList/GroceryList';
import RecipeSection from './Components/RecipeSection/RecipeSection';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/recipes" element={<RecipeSection />} />
      <Route path="/groceries" element={<GroceryList />} />
      <Route
        path="*"
        element={(
          <main style={{ padding: '1rem' }}>
            <p>Invalid URL!</p>
          </main>
                )}
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
