package com.drbaltar.mealplanserver.Controllers;

import com.drbaltar.mealplanserver.Models.Recipe;
import com.drbaltar.mealplanserver.Repositories.RecipeRepository;
import com.drbaltar.mealplanserver.Views.Views;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.security.core.parameters.P;
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
}
