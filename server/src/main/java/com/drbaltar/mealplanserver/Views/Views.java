package com.drbaltar.mealplanserver.Views;

import com.fasterxml.jackson.annotation.JsonView;

public class Views {
    public static interface RecipePublic {
    }

    public static interface IngredientPublic extends RecipePublic{
    }
}
