package com.drbaltar.mealplanserver.Models;

import com.drbaltar.mealplanserver.Views.Views;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

@Entity
@Table(name = "INGREDIENTS")
public class Ingredient {

    @JsonView(Views.IngredientPublic.class)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @JsonView(Views.RecipePublic.class)
    @Column(nullable = false)
    private String name;

    @JsonView(Views.RecipePublic.class)
    @Column(nullable = false)
    private float quantity;

    @JsonView(Views.RecipePublic.class)
    @Column(nullable = false)
    private String unit;

    @JsonView(Views.RecipePublic.class)
    private boolean hasIngredient;

    public Ingredient() {
    }

    public Ingredient(String name, float quantity, String unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getQuantity() {
        return quantity;
    }

    public void setQuantity(float quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public boolean hasIngredient() {
        return hasIngredient;
    }

    public void setHasIngredient(boolean hasIngredient) {
        this.hasIngredient = hasIngredient;
    }
}
