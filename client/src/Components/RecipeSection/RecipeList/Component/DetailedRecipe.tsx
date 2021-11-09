import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardContent, Container, IconButton, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { Recipe } from '../../../../Models/Recipe';

interface Props {
    recipe: Recipe
    onReturnToList: () => void
    onUpdateList: () => void
}

function DetailedRecipe({ recipe, onReturnToList, onUpdateList }: Props): ReactElement {
  const handleDeleteRecipe = () => {
    axios.delete(`/api/recipes/${recipe.id}`)
      .then(onUpdateList)
      .then(onReturnToList);
  };

  function renderIngredients() {
    return recipe.ingredients.map((ingredient) => {
      const text = `${ingredient.name}, ${ingredient.quantity} ${ingredient.unit}`;
      return (
        <Typography variant="h6">
          <li>{text}</li>
        </Typography>
      );
    });
  }

  return (
    <div>
      <Button variant="contained" sx={{ marginBottom: '15px' }} onClick={onReturnToList}>Return to List</Button>
      <Container maxWidth="md">
        <Card>
          <CardContent sx={{ margin: '15px' }}>
            <Typography sx={{ textAlign: 'center' }} variant="h3">{recipe.name}</Typography>
            <Typography variant="h4">Ingredients</Typography>
            {renderIngredients()}
          </CardContent>
          <Button variant="contained" sx={{ marginBottom: '25px', marginLeft: '15px' }}>Select</Button>
          <IconButton
            edge="end"
            aria-label="delete"
            sx={{ float: 'right', marginRight: '15px' }}
            onClick={handleDeleteRecipe}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" sx={{ float: 'right', marginRight: '15px' }}>
            <EditIcon />
          </IconButton>
        </Card>
      </Container>
    </div>

  );
}

DetailedRecipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
    })),
  }).isRequired,
  onReturnToList: PropTypes.func.isRequired,
  onUpdateList: PropTypes.func.isRequired,
};

export default DetailedRecipe;
