import { Injectable } from "@angular/core";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe',
    //         'This is the recipe for margherita pizza',
    //         'https://cdn.pixabay.com/photo/2012/04/01/16/51/pizza-23477__340.png',
    //         [
    //             new Ingredient('Flower', 200),
    //             new Ingredient('Salt', 1),
    //             new Ingredient('Oil', 1),
    //             new Ingredient('Tomato', 5),
    //             new Ingredient('Mozzarella cheese', 1),
    //             new Ingredient('Basil', 1)
    //         ]
    //     ),
    //     new Recipe(
    //         'Another Test Recipe',
    //         'This is the recipe for pizza with pineapple',
    //         'https://cdn.pixabay.com/photo/2012/04/01/16/51/pizza-23477__340.png',
    //         [
    //             new Ingredient('Flower', 200),
    //             new Ingredient('Salt', 1),
    //             new Ingredient('Oil', 1),
    //             new Ingredient('Tomato', 5),
    //             new Ingredient('Pineapple', 1)
    //         ]
    //     ),
    //     new Recipe(
    //         'Yet Another Test Recipe',
    //         'This is the recipe for the white pizza',
    //         'https://cdn.pixabay.com/photo/2012/04/01/16/51/pizza-23477__340.png',
    //         [
    //             new Ingredient('Flower', 200),
    //             new Ingredient('Salt', 1),
    //             new Ingredient('Oil', 1),
    //             new Ingredient('Rosemary', 1)
    //         ]
    //     )
    // ];
    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
