import React, { ReactElement, useState } from 'react';
import RecipeList from './RecipeList/RecipeList';
import NewRecipeForm from './NewRecipeForm/NewRecipeForm';

function RecipeSection(): ReactElement {
  const [isInNewForm, setIsInNewForm] = useState(false);

  const handleNewRecipe = () => {
    setIsInNewForm(true);
  };

  const handleReturnToList = () => {
    setIsInNewForm(false);
  };

  return (
    <div>
      {isInNewForm
        ? <NewRecipeForm onReturnToList={handleReturnToList} />
        : <RecipeList onNewRecipe={handleNewRecipe} />}
    </div>
  );
}

export default RecipeSection;
