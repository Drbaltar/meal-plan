package com.drbaltar.mealplanserver.Controllers;

import com.drbaltar.mealplanserver.Models.Ingredient;
import com.drbaltar.mealplanserver.Models.Recipe;
import com.drbaltar.mealplanserver.Repositories.RecipeRepository;
import com.drbaltar.mealplanserver.Views.Views;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private RecipeRepository repository;

    public RecipeController(RecipeRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @JsonView(Views.Public.class)
    public Recipe saveNewRecipe(@RequestBody Recipe newRecipe) {
        validateRecipeInput(newRecipe);
        return repository.save(newRecipe);
    }

    @GetMapping("/{id}")
    @JsonView(Views.Public.class)
    public Optional<Recipe> getRecipeByID(@PathVariable long id) {
        return repository.findById(id);
    }

    @GetMapping
    @JsonView(Views.Public.class)
    public Iterable<Recipe> getAllRecipes() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    @JsonView(Views.Public.class)
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

}
