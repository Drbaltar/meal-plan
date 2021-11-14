package com.drbaltar.mealplanserver.Models;

import com.drbaltar.mealplanserver.Views.Views;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "RECIPES")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.RecipePublic.class)
    private Long id;

    @JsonView(Views.RecipePublic.class)
    @Column(nullable = false)
    private String name;

    @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL)
    @JoinColumn(name = "recipe_id")
    @JsonView(Views.RecipePublic.class)
    @Column(nullable = false)
    private Set<Ingredient> ingredients;

    @JsonView(Views.RecipePublic.class)
    private boolean isPlanned;

    public Recipe() {
    }

    public Recipe(String name, Set<Ingredient> ingredients) {
        this.name = name;
        this.ingredients = ingredients;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Set<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void addIngredient(Ingredient newIngredient) {
        ingredients.add(newIngredient);
    }

    public void removeIngredient(Ingredient ingredientToRemove) {
        ingredients.remove(ingredientToRemove);
    }

    public boolean isPlanned() {
        return isPlanned;
    }

    public void setPlanned(boolean planned) {
        isPlanned = planned;
    }
}
