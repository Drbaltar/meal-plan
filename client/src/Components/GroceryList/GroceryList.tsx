import React, { ReactElement, useEffect, useState } from 'react';
import {
  Checkbox, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography,
} from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Ingredient } from '../../Models/Ingredient';

function GroceryList(): ReactElement {
  const [groceryItems, setGroceryItems] = useState<Array<Ingredient>>([]);

  useEffect(() => {
    refreshGroceryList();
  }, []);

  function refreshGroceryList() {
    axios.get('/api/groceries/from-recipes')
      .then((results) => setGroceryItems(results.data.sort(compareIngredients)));
  }

  function handleIngredientUpdate(item: Ingredient): void {
    axios.patch(`/api/groceries/${item.id}`, { hasIngredient: !item.hasIngredient })
      .then(refreshGroceryList);
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignContent: 'center', margin: '30px',
    }}
    >
      <Typography variant="h2">Grocery List</Typography>
      {groceryItems.length > 0
        ? renderGroceryList(groceryItems, handleIngredientUpdate)
        : <h3>No Grocery Items Found!</h3>}
      <Link to="/">
        <Fab
          color="primary"
          aria-label="grocery-list"
          sx={{ position: 'fixed', bottom: '40px', border: '2px solid white' }}
        >
          <HomeIcon />
        </Fab>
      </Link>
    </div>
  );
}

function renderGroceryList(groceryItems: Array<Ingredient>, handleIngredientUpdate: (item: Ingredient) => void) {
  return (
    <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>
      {groceryItems.map((item) => {
        const labelId = `checkbox-list-label-${item.name}`;

        return (
          <ListItem
            key={item.id}
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.hasIngredient}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  onChange={() => handleIngredientUpdate(item)}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${item.name}, ${item.quantity} ${item.unit}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

function compareIngredients(a: Ingredient, b: Ingredient): number {
  if (a.hasIngredient && !b.hasIngredient) return 1;
  if (b.hasIngredient && !a.hasIngredient) return -1;
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

export default GroceryList;
