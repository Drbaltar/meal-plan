import React, { ReactElement, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';
import { Ingredient } from '../../../../Models/Ingredient';

interface Props {
    onAddIngredient: (ingredient: Ingredient) => void
}

interface FormValidation {
    isNameValid: boolean,
    isQuantityValid: boolean,
    isUnitsValid: boolean
}

function IngredientForm({ onAddIngredient }: Props): ReactElement {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [unit, setUnit] = useState('');
  const [formValidation, setFormValidation] = useState<FormValidation | null>(null);
  const ingredientName = useRef<HTMLDivElement | null>(null);

  function validateFields(): FormValidation {
    const newFormValidation: FormValidation = {
      isNameValid: name.length > 0,
      isQuantityValid: Number.parseFloat(quantity) > 0,
      isUnitsValid: unit.length > 0,
    };

    return newFormValidation;
  }

  const handleAddClick = () => {
    const newFormValidation = validateFields();
    if (Object.values(newFormValidation).includes(false)) {
      setFormValidation(newFormValidation);
    } else {
      onAddIngredient({ name, quantity: Number.parseFloat(quantity), unit });
      setFormValidation(null);
      setName('');
      setQuantity('0');
      setUnit('');
      if (ingredientName) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ingredientName.current.focus();
      }
    }
  };

  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', flexDirection: 'row', columnGap: '15px', rowGap: '15px',
    }}
    >
      <TextField
        autoFocus
        inputRef={ingredientName}
        id="ingredient-name"
        label="Ingredient Name"
        variant="filled"
        sx={{ backgroundColor: 'white' }}
        error={formValidation != null ? !formValidation.isNameValid : undefined}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="ingredient-quantity"
        label="Quantity"
        variant="filled"
        sx={{ backgroundColor: 'white' }}
        error={formValidation != null ? !formValidation.isQuantityValid : undefined}
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
        error={formValidation != null ? !formValidation.isUnitsValid : undefined}
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddClick}>Add</Button>
    </div>
  );
}

IngredientForm.propTypes = {
  onAddIngredient: PropTypes.func.isRequired,
};

export default IngredientForm;
