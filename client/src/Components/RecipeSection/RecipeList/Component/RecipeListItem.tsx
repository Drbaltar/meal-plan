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
  return (
    <Grid item xs={3}>
      <Card sx={{ height: 300 }}>
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
  }).isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
};
export default RecipeListItem;
