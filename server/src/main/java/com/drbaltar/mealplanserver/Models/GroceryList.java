package com.drbaltar.mealplanserver.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GroceryList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long recipeID;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Long getRecipeID() {
        return recipeID;
    }

    public void setRecipeID(Long recipeID) {
        this.recipeID = recipeID;
    }
}
