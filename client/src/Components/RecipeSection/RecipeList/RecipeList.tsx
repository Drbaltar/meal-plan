import React, { ReactElement, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Fab, Grid, TextField, ToggleButton, ToggleButtonGroup,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Link } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import HideImageIcon from '@mui/icons-material/HideImage';
import RecipeListItem from './Component/RecipeListItem';
import { Recipe } from '../../../Models/Recipe';
import DetailedRecipe from './Component/DetailedRecipe';

interface Props {
    onNewRecipe: () => void
}

function RecipeList({ onNewRecipe }: Props): ReactElement {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [filter, setFilter] = useState('');
  const [viewType, setViewType] = useState('ImageView');

  useEffect(() => {
    handleUpdateList();
  }, []);

  const handleUpdateList = () => {
    axios.get('/api/recipes')
      .then((results) => setRecipes(createSortedRecipeList(results.data)));
  };

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, viewValue: string) => {
    if (viewValue !== null) setViewType(viewValue);
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
  };

  const handleReturnToList = () => {
    setCurrentRecipe(null);
  };

  const renderRecipeList = () => recipes.filter((recipe) => recipe.name.includes(filter)).map((recipe: Recipe) => {
    const { id } = recipe;
    return (
      <RecipeListItem
        key={id}
        recipe={recipe}
        onSelectRecipe={handleSelectRecipe}
        isImageShown={viewType === 'ImageView'}
      />
    );
  });

  function renderListView() {
    return (
      <>
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', gap: '20px',
        }}
        >
          <TextField
            id="recipe-name-filter"
            label="Filter Recipe By Name"
            variant="outlined"
            sx={{ backgroundColor: 'white' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <ToggleButtonGroup
            value={viewType}
            exclusive
            onChange={handleViewChange}
            sx={{ backgroundColor: 'white', outline: 'gray solid 2px' }}
          >
            <ToggleButton value="ImageView" aria-label="ImageView">
              <ImageIcon />
            </ToggleButton>
            <ToggleButton value="ListView" aria-label="ListView">
              <HideImageIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <Grid container spacing={3}>
          {renderRecipeList()}
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          onClick={onNewRecipe}
          sx={{ position: 'fixed', bottom: '40px', border: '2px solid white' }}
        >
          <AddIcon />
        </Fab>
        <Link to="/groceries">
          <Fab
            color="secondary"
            aria-label="grocery-list"
            sx={{
              position: 'fixed', bottom: '40px', right: '30px', border: '2px solid white',
            }}
          >
            <LocalGroceryStoreIcon />
          </Fab>
        </Link>
      </>
    );
  }

  return (
    <div style={{ margin: '30px' }}>
      {currentRecipe === null ? renderListView()
        : (
          <DetailedRecipe
            recipe={currentRecipe}
            onReturnToList={handleReturnToList}
            onUpdateList={handleUpdateList}
          />
        )}
    </div>
  );
}

function createSortedRecipeList(recipes: Array<Recipe>): Array<Recipe> {
  const tempArray = [...recipes];
  return tempArray.sort(compareRecipes);
}

function compareRecipes(a: Recipe, b: Recipe): number {
  if (a.isPlanned && !b.isPlanned) return -1;
  if (b.isPlanned && !a.isPlanned) return 1;
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

RecipeList.propTypes = {
  onNewRecipe: PropTypes.func.isRequired,
};

export default RecipeList;
