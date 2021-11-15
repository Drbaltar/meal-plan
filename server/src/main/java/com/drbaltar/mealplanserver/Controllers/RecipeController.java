package com.drbaltar.mealplanserver.Controllers;

import com.drbaltar.mealplanserver.Models.Ingredient;
import com.drbaltar.mealplanserver.Models.Recipe;
import com.drbaltar.mealplanserver.Repositories.RecipeRepository;
import com.drbaltar.mealplanserver.Views.Views;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeRepository repository;

    public RecipeController(RecipeRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @JsonView(Views.RecipePublic.class)
    public Recipe saveNewRecipe(@RequestBody Recipe newRecipe) {
        validateRecipeInput(newRecipe);
        return repository.save(newRecipe);
    }

    @PatchMapping("/{id}")
    @JsonView(Views.RecipePublic.class)
    public Recipe updateRecipeByID(@PathVariable long id, @RequestBody HashMap<String, String> updates) {
        final var recipeToUpdate = repository.findById(id);
        return recipeToUpdate.map(recipe -> {
            updates.forEach((key, value) -> {
                if (key.equals("isPlanned")) {
                    final var isPlannedUpdate = Boolean.parseBoolean(value);
                    recipe.setPlanned(isPlannedUpdate);
                    if (!isPlannedUpdate)
                        recipe.getIngredients().forEach(ingredient -> ingredient.setHasIngredient(false));
                }
            });
            repository.save(recipe);
            return recipe;
        }).orElseThrow(RecipeNotFoundException::new);
    }

    @GetMapping("/{id}")
    @JsonView(Views.RecipePublic.class)
    public Optional<Recipe> getRecipeByID(@PathVariable long id) {
        return repository.findById(id);
    }

    @GetMapping
    @JsonView(Views.RecipePublic.class)
    public Iterable<Recipe> getAllRecipes() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    @JsonView(Views.RecipePublic.class)
    public String deleteRecipeByID(@PathVariable long id) {
        repository.deleteById(id);
        return "Recipe successfully deleted!";
    }

    private void validateRecipeInput(Recipe newRecipe) {
        var errors = new StringBuilder();
        var errorFlag = false;

        if (newRecipe.getName() == null || newRecipe.getName().equals("")) {
            errors.append("Recipe name is required\n");
            errorFlag = true;
        }
        if (newRecipe.getIngredients() == null || newRecipe.getIngredients().size() == 0) {
            if (errors.isEmpty())
                errors.append("Ingredients list is required!\n");
            else
                errors.append(" and Ingredients list is required!");
            errorFlag = true;
        } else {
            validateAllIngredients(newRecipe);
        }

        if (errorFlag)
            throw new MissingArgumentsException(errors.toString());
    }

    private void validateAllIngredients(Recipe newRecipe) {
        final var ingredients = newRecipe.getIngredients();

        for (Ingredient ingredient : ingredients) {
            validateIngredient(ingredient);
        }
    }

    private void validateIngredient(Ingredient ingredient) {
        if (ingredient.getName().equals("") || ingredient.getQuantity() <= 0 || ingredient.getUnit().equals(""))
            throw new MissingArgumentsException("Missing required values in at least one of your ingredient fields!");
    }

    @ExceptionHandler(MissingArgumentsException.class)
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public String handleMissingArguments(MissingArgumentsException exception) {
        return exception.getMessage();
    }

    @ExceptionHandler(RecipeNotFoundException.class)
    @ResponseStatus(code = HttpStatus.NOT_FOUND)
    public String handleMissingRecipeEntry() {
        return "Recipe entry not found!";
    }

}
