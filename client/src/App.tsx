import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import shoppingImage from './shopping.jpg';
import cookingImage from './cooking.jpg';

function App(): ReactElement {
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        marginTop: '20px',
        height: '100vh',
      }}
    >
      <ImageList
        sx={{
          width: 700, height: 'auto',
        }}
        cols={1}
        gap={10}
      >
        <Link to="/recipes">
          <ImageListItem>
            <img
              src={cookingImage}
              alt="Recipe Section"
              loading="lazy"

            />
            <Typography
              variant="h1"
              style={{
                position: 'absolute',
                top: '35%',
                bottom: 'auto',
                color: 'white',
                right: '25%',
                backgroundColor: 'slategray',
              }}
            >
              Recipes
            </Typography>
          </ImageListItem>
        </Link>
        <Link to="/groceries">
          <ImageListItem>
            <img
              src={shoppingImage}
              alt="Grocery Section"
              loading="lazy"
            />
            <Typography
              variant="h1"
              style={{
                position: 'absolute',
                top: '35%',
                bottom: 'auto',
                color: 'white',
                right: '15%',
                backgroundColor: 'slategray',
              }}
            >
              Groceries
            </Typography>
          </ImageListItem>
        </Link>
      </ImageList>
    </div>
  );
}

export default App;
