import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({
    providers: [
      RecipeService,
      ShoppingListService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
      }
    ]
  })
  export class AppCoreModule { }