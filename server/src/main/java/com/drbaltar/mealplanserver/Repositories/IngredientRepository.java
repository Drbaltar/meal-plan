package com.drbaltar.mealplanserver.Repositories;

import com.drbaltar.mealplanserver.Models.Ingredient;
import org.springframework.data.repository.CrudRepository;

public interface IngredientRepository extends CrudRepository<Ingredient, Long> {
}
