import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simple a test',
            'https://cdn.pixabay.com/photo/2012/04/01/16/51/pizza-23477__340.png'
        ),
        new Recipe(
            'Another Test Recipe',
            'This is simple a test',
            'https://cdn.pixabay.com/photo/2012/04/01/16/51/pizza-23477__340.png'
        ),
        new Recipe(
            'Yet Another Test Recipe',
            'This is simple a test',
            'https://cdn.pixabay.com/photo/2012/04/01/16/51/pizza-23477__340.png'
        )
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}