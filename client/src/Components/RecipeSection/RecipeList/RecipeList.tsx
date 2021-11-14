import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { Fab, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Link } from 'react-router-dom';
import RecipeListItem from './Component/RecipeListItem';
import { Recipe } from '../../../Models/Recipe';
import DetailedRecipe from './Component/DetailedRecipe';

interface Props {
    onNewRecipe: () => void
}

function RecipeList({ onNewRecipe }: Props): ReactElement {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);

  const handleUpdateList = () => {
    axios.get('/api/recipes')
      .then((results) => setRecipes(results.data));
  };

  useEffect(() => {
    handleUpdateList();
  }, []);

  const handleSelectRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
  };

  const handleReturnToList = () => {
    setCurrentRecipe(null);
  };

  const renderRecipeList = () => recipes.map((recipe: Recipe) => {
    const { id } = recipe;
    return <RecipeListItem key={id} recipe={recipe} onSelectRecipe={handleSelectRecipe} />;
  });

  function renderListView() {
    return (
      <>
        <Grid container spacing={3}>
          {renderRecipeList()}
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          onClick={onNewRecipe}
          sx={{ position: 'fixed', bottom: '40px', border: '2px solid white' }}
        >
          <AddIcon />
        </Fab>
        <Link to="/groceries">
          <Fab
            color="secondary"
            aria-label="grocery-list"
            sx={{
              position: 'fixed', bottom: '40px', right: '30px', border: '2px solid white',
            }}
          >
            <LocalGroceryStoreIcon />
          </Fab>
        </Link>
      </>
    );
  }

  return (
    <div style={{ margin: '30px' }}>
      {currentRecipe === null ? renderListView()
        : <DetailedRecipe recipe={currentRecipe} onReturnToList={handleReturnToList} onUpdateList={handleUpdateList} />}
    </div>
  );
}

RecipeList.propTypes = {
  onNewRecipe: PropTypes.func.isRequired,
};

export default RecipeList;
