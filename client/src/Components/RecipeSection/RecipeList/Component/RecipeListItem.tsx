import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardActionArea, CardContent, CardMedia, Grid,
} from '@mui/material';
import { Recipe } from '../../../../Models/Recipe';
import defaultIcon from './dish.png';

interface Props {
    recipe: Recipe,
    onSelectRecipe: (recipe: Recipe) => void,
    isImageShown: boolean
}

function RecipeListItem({ recipe, onSelectRecipe, isImageShown }: Props): ReactElement {
  let selectedStyle;
  if (recipe.isPlanned) {
    selectedStyle = {
      outline: '5px solid black',
      background: 'green',
      color: 'white',
    };
  }
  return (
    <Grid item>
      <Card sx={{ width: '250px', textAlign: 'center', ...selectedStyle }}>
        <CardActionArea sx={{ height: '100%' }} onClick={() => onSelectRecipe(recipe)}>
          <CardMedia
            className={isImageShown ? 'recipe-image-open' : 'recipe-image-closed'}
            component="img"
            image={recipe.imageURL ? recipe.imageURL : defaultIcon}
            alt={recipe.name}
            sx={{ backgroundColor: 'white' }}
          />
          <CardContent sx={{
            fontSize: 'medium',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          >
            {recipe.name}
          </CardContent>
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
    imageURL: PropTypes.string,
  }).isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
  isImageShown: PropTypes.bool.isRequired,
};
export default RecipeListItem;
