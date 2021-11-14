import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardActionArea, CardHeader, Grid,
} from '@mui/material';
import { Recipe } from '../../../../Models/Recipe';

interface Props {
    recipe: Recipe,
    onSelectRecipe: (recipe: Recipe) => void
}

function RecipeListItem({ recipe, onSelectRecipe }: Props): ReactElement {
  let selectedStyle;
  if (recipe.isPlanned) {
    selectedStyle = {
      border: '5px solid black',
      background: 'green',
      color: 'white',
    };
  }
  return (
    <Grid item>
      <Card sx={{ minWidth: '250px', ...selectedStyle }}>
        <CardActionArea sx={{ height: '100%' }} onClick={() => onSelectRecipe(recipe)}>
          <CardHeader title={recipe.name} />
        </CardActionArea>
      </Card>
    </Grid>
  );
}

RecipeListItem.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
    })),
    isPlanned: PropTypes.bool.isRequired,
  }).isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
};
export default RecipeListItem;
