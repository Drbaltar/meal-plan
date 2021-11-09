import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import { Fab, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
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
          sx={{ position: 'absolute', bottom: '40px' }}
        >
          <AddIcon />
        </Fab>
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
