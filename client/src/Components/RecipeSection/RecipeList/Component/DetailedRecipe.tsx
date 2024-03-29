import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, CardContent, CardMedia, Container, IconButton, Typography,
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
  const handleSelectToggle = () => {
    axios.patch(`/api/recipes/${recipe.id}`, { isPlanned: !recipe.isPlanned })
      .then(onUpdateList)
      .then(onReturnToList);
  };

  const handleDeleteRecipe = () => {
    axios.delete(`/api/recipes/${recipe.id}`)
      .then(onUpdateList)
      .then(onReturnToList);
  };

  function renderIngredients() {
    return recipe.ingredients.map((ingredient) => {
      const text = `${ingredient.name}, ${ingredient.quantity} ${ingredient.unit}`;
      return (
        <Typography key={text} variant="h6">
          <li>{text}</li>
        </Typography>
      );
    });
  }

  function renderSelectButton() {
    return (
      <Button
        variant="contained"
        sx={{ marginBottom: '25px', marginLeft: '15px' }}
        onClick={handleSelectToggle}
      >
        Select for Plan
      </Button>
    );
  }

  function renderRemoveButton() {
    return (
      <Button
        variant="contained"
        color="error"
        sx={{ marginBottom: '25px', marginLeft: '15px' }}
        onClick={handleSelectToggle}
      >
        Remove from Plan
      </Button>
    );
  }

  function getCardMedia() {
    if (recipe.imageURL) {
      return (
        <CardMedia
          component="img"
          height="100%"
          image={recipe.imageURL}
          alt={recipe.name}
        />
      );
    }
    return null;
  }

  return (
    <div>
      <Button variant="contained" sx={{ marginBottom: '15px' }} onClick={onReturnToList}>Return to List</Button>
      <Container maxWidth="md">
        <Card>
          <CardContent sx={{ margin: '15px' }}>
            {getCardMedia()}
            <Typography sx={{ textAlign: 'center', marginBottom: '1rem' }} variant="h5">{recipe.name}</Typography>
            <Typography variant="h5" fontWeight="bold">Ingredients</Typography>
            {renderIngredients()}
          </CardContent>
          {recipe.isPlanned ? renderRemoveButton() : renderSelectButton()}
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
    isPlanned: PropTypes.bool.isRequired,
    imageURL: PropTypes.string,
  }).isRequired,
  onReturnToList: PropTypes.func.isRequired,
  onUpdateList: PropTypes.func.isRequired,
};

export default DetailedRecipe;
