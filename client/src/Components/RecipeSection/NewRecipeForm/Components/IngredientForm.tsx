import React, { ReactElement, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Ingredient } from '../../../../Models/Ingredient';

interface Props {
  onAddIngredient: (ingredient: Ingredient) => void
}

function IngredientForm({ onAddIngredient }: Props): ReactElement {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [unit, setUnit] = useState('');

  const handleAddClick = () => {
    const quantityAsNumber = Number.parseFloat(quantity);
    onAddIngredient({ name, quantity: quantityAsNumber, unit });
    setName('');
    setQuantity('0');
    setUnit('');
  };

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', flexDirection: 'row', columnGap: '15px', rowGap: '15px',
    }}
    >
      <TextField
        id="ingredient-name"
        label="Ingredient Name"
        variant="filled"
        sx={{ backgroundColor: 'white' }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="ingredient-quantity"
        label="Quantity"
        variant="filled"
        sx={{ backgroundColor: 'white' }}
        type="number"
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <TextField
        id="ingredient-unit"
        label="Unit"
        variant="filled"
        sx={{ backgroundColor: 'white' }}
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <button type="button" onClick={handleAddClick}>Add</button>
    </div>
  );
}

IngredientForm.propTypes = {
  onAddIngredient: PropTypes.func.isRequired,
};

export default IngredientForm;
