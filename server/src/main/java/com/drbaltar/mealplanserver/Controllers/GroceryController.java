package com.drbaltar.mealplanserver.Controllers;

import com.drbaltar.mealplanserver.Models.Ingredient;
import com.drbaltar.mealplanserver.Models.Recipe;
import com.drbaltar.mealplanserver.Repositories.IngredientRepository;
import com.drbaltar.mealplanserver.Repositories.RecipeRepository;
import com.drbaltar.mealplanserver.Views.Views;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/groceries")
public class GroceryController {

    private RecipeRepository recipeRepository;
    private IngredientRepository ingredientRepository;

    public GroceryController(RecipeRepository recipeRepository, IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
    }

    @GetMapping("/from-recipes")
    @JsonView(Views.IngredientPublic.class)
    public Iterable<Ingredient> getAllIngredientsFromRecipes() {
        final var plannedRecipes = recipeRepository.findAllByIsPlannedTrue();
        ArrayList<Ingredient> allRecipeIngredients = new ArrayList<>();

        for (Recipe plannedRecipe : plannedRecipes)
            allRecipeIngredients.addAll(plannedRecipe.getIngredients());

        return allRecipeIngredients;
    }

    @PatchMapping("/{id}")
    @JsonView(Views.IngredientPublic.class)
    public Ingredient updateIngredient(@PathVariable long id, @RequestBody HashMap<String, String> updates) {
        final var ingredientToUpdate = ingredientRepository.findById(id);
        return ingredientToUpdate.map(ingredient -> {
            updates.forEach((key, value) -> {
                if (key.equals("hasIngredient"))
                    ingredient.setHasIngredient(Boolean.parseBoolean(value));
            });
            ingredientRepository.save(ingredient);
            return ingredient;
        }).orElseThrow(IngredientNotFoundException::new);
    }

    @ExceptionHandler(IngredientNotFoundException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public String handleMissingIngredientEntry() {
        return "Ingredient entry not found!";
    }
}
