package com.drbaltar.mealplanserver.Controllers;

import com.drbaltar.mealplanserver.Models.Ingredient;
import com.drbaltar.mealplanserver.Models.Recipe;
import com.drbaltar.mealplanserver.Repositories.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class RecipeControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    RecipeRepository repository;

    @Test
    @Transactional
    @Rollback
    void shouldReturnBadRequestIfNoIngredientsAdded() throws Exception {
        final var testJson = """
                {
                    "name": "Baked Potato",
                    "ingredients": []
                }
                """;

        final var request = post("/api/recipes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson);

        mvc.perform(request)
                .andExpect(status().is(400));
    }

    @Test
    @Transactional
    @Rollback
    void shouldSaveNewRecipe() throws Exception {
        final var testJson = """
                {
                    "name": "Baked Potato",
                    "ingredients": [
                        { 
                            "name": "potatoes",
                            "quantity": 2,
                            "unit": "EA"
                        },                      
                        { 
                            "name": "butter",
                            "quantity": 2,
                            "unit": "EA"
                        }
                    ]
                }
                """;

        final var request = post("/api/recipes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(testJson);

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(content().json(testJson))
                .andExpect(jsonPath("$.id").isNumber());
    }

    @Test
    @Transactional
    @Rollback
    void shouldGetRecipeByID() throws Exception {
        final Recipe testRecipe = saveTestRecipe();

        final var request = get("/api/recipes/%d".formatted(testRecipe.getId()));

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(testRecipe.getName()))
                .andExpect(jsonPath("$.ingredients.length()").value(2));
    }

    @Test
    @Transactional
    @Rollback
    void shouldRetrieveAllRecipes() throws Exception {
        saveTestRecipe();
        saveTestRecipe();
        saveTestRecipe();

        final var request = get("/api/recipes");

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(3));
    }

    @Test
    @Transactional
    @Rollback
    void shouldDeleteRecipeByID() throws Exception {
        final Recipe testRecipe = saveTestRecipe();

        final var request = delete("/api/recipes/%d".formatted(testRecipe.getId()));

        mvc.perform(request)
                .andExpect(status().isOk());

        assertTrue(repository.findById(testRecipe.getId()).isEmpty());
    }

    @Test
    @Transactional
    @Rollback
    void shouldBeAbleToSetRecipeToBeingPlanned() throws Exception {
        final Recipe testRecipe = saveTestRecipe();
        final var testJSON = """
                {
                    "isPlanned": true
                }
                """;

        final var request = patch("/api/recipes/%d".formatted(testRecipe.getId()))
                .contentType(MediaType.APPLICATION_JSON)
                        .content(testJSON);

        mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isPlanned").value(true));
    }

    private Recipe saveTestRecipe() {
        final var ingredients = new HashSet<Ingredient>();
        ingredients.add(new Ingredient("Flour", 1, "cup"));
        ingredients.add(new Ingredient("Egg", 1, "EA"));
        final var testRecipe = repository.save(new Recipe("Pizza", ingredients));
        return testRecipe;
    }
}
