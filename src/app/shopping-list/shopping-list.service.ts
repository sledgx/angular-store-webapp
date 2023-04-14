import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        const index = this.ingredients.findIndex(e => e.name === ingredient.name)
        if (index > -1) {
            this.ingredients[index].amount += ingredient.amount;
        } else {
            this.ingredients.push(ingredient);
        }

        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        for (let ingredient of ingredients) {
            this.addIngredient(ingredient);
        }
    }
}
