package com.drbaltar.mealplanserver.Controllers;

import com.drbaltar.mealplanserver.Models.Ingredient;
import com.drbaltar.mealplanserver.Models.Recipe;
import com.drbaltar.mealplanserver.Repositories.RecipeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class GroceryControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    RecipeRepository repository;

    @Test
    @Transactional
    @Rollback
    void shouldAddRecipeToCurrentMealPlanList() throws Exception {
        final var testRecipe = saveTestRecipe();

        final var request = post("/api/groceries/recipe/%d".formatted(testRecipe.getId()));
        mvc.perform(request)
                .andExpect(status().isOk());
    }

    private Recipe saveTestRecipe() {
        final var ingredients = new HashSet<Ingredient>();
        ingredients.add(new Ingredient("Flour", 1, "cup"));
        ingredients.add(new Ingredient("Egg", 1, "EA"));
        final var testRecipe = repository.save(new Recipe("Pizza", ingredients));
        return testRecipe;
    }
}
