import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Ingredient } from '../../../../Models/Ingredient';

interface Props {
    ingredient: Ingredient
    index: number
    onDeleteIngredient: (index: number) => void
}

function IngredientEntry({ ingredient, index, onDeleteIngredient }: Props): ReactElement {
  return (
    <ListItem secondaryAction={(
      <IconButton edge="end" aria-label="delete" onClick={() => onDeleteIngredient(index)}>
        <DeleteIcon />
      </IconButton>
        )}
    >
      <ListItemText>
        {`${ingredient.name}, ${ingredient.quantity} ${ingredient.unit}`}
      </ListItemText>
    </ListItem>
  );
}

IngredientEntry.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onDeleteIngredient: PropTypes.func.isRequired,
};

export default IngredientEntry;
