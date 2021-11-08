package com.drbaltar.mealplanserver.Repositories;

import com.drbaltar.mealplanserver.Models.Recipe;
import org.springframework.data.repository.CrudRepository;

public interface RecipeRepository extends CrudRepository<Recipe, Long> {
}
