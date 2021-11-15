import React, { ReactElement, useState } from 'react';
import {
  Alert,
  Box, Button, Grid, List, TextField, Typography,
} from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import axios from 'axios';
import PropTypes from 'prop-types';
import IngredientForm from './Components/IngredientForm';
import { Ingredient } from '../../../Models/Ingredient';
import IngredientEntry from './Components/IngredientEntry';

interface Props {
  onReturnToList: () => void
}

function NewRecipeForm({ onReturnToList }: Props): ReactElement {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const [isIngredientFormShown, setIsIngredientFormShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddIngredient = (newIngredient: Ingredient) => {
    setIngredients([...ingredients, newIngredient]);
  };

  const handleDeleteIngredient = (index: number) => {
    const tempArray = [...ingredients];
    tempArray.splice(index, 1);
    setIngredients(tempArray);
  };

  const handleRecipeSave = () => {
    axios.post('/api/recipes', { name, ingredients })
      .then(onReturnToList)
      .catch((error) => setErrorMessage(error.response.data));
  };

  function renderIngredientList() {
    return ingredients.map((ingredient, index) => (
      <IngredientEntry
        key={ingredient.name}
        ingredient={ingredient}
        index={index}
        onDeleteIngredient={handleDeleteIngredient}
      />
    ));
  }

  function renderIngredientForm() {
    return <IngredientForm onAddIngredient={handleAddIngredient} />;
  }

  function renderAddIcon() {
    return <AddCircleOutlineOutlinedIcon onClick={() => setIsIngredientFormShown(true)} />;
  }

  function renderErrorMessage() {
    return <Alert sx={{ marginTop: '15px' }} severity="error">{errorMessage}</Alert>;
  }

  return (
    <Box sx={{
      padding: '20px',
      maxWidth: '800',
      backgroundColor: 'rgba(0,0,0,.5)',
      color: 'white',
    }}
    >
      <Grid columns={1}>
        <Typography variant="h3">New Recipe</Typography>
        <TextField
          id="recipe-name"
          label="Recipe Name"
          variant="filled"
          sx={{ marginTop: '15px', backgroundColor: 'white' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Typography variant="h5" sx={{ paddingY: '15px' }}>Ingredient List</Typography>
        <List sx={{ maxWidth: '250px' }}>
          {renderIngredientList()}
        </List>
        {isIngredientFormShown ? renderIngredientForm() : renderAddIcon()}
      </Grid>
      {errorMessage !== '' ? renderErrorMessage() : null}
      <Button
        variant="contained"
        onClick={handleRecipeSave}
        sx={{ marginTop: '30px', marginRight: '15px' }}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        onClick={onReturnToList}
        sx={{ marginTop: '30px', backgroundColor: 'lightgray' }}
      >
        Cancel
      </Button>
    </Box>
  );
}

NewRecipeForm.propTypes = {
  onReturnToList: PropTypes.func.isRequired,
};

export default NewRecipeForm;
