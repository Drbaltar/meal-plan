import React, {
  ReactElement, useEffect, useState,
} from 'react';
import axios from 'axios';
import { Fab, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import RecipeListItem from './Component/RecipeListItem';
import { Recipe } from '../../../Models/Recipe';

interface Props {
    onNewRecipe: () => void
}

function RecipeList({ onNewRecipe }: Props): ReactElement {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/api/recipes')
      .then((results) => setRecipes(results.data));
  }, []);

  const renderRecipeList = () => recipes.map((recipe: Recipe) => {
    const { id } = recipe;
    return <RecipeListItem key={id} recipe={recipe} />;
  });

  return (
    <div style={{ margin: '30px' }}>
      <Grid container spacing={3}>
        {renderRecipeList()}
      </Grid>
      <Fab color="primary" aria-label="add" onClick={onNewRecipe}>
        <AddIcon />
      </Fab>
    </div>
  );
}

RecipeList.propTypes = {
  onNewRecipe: PropTypes.func.isRequired,
};

export default RecipeList;
