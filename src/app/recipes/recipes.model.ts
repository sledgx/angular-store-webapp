import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../auth/auth.guard";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipes-resolver.service";


const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: RecipeStartComponent
            },
            {
                path: 'new',
                component: RecipeEditComponent
            },
            {
                path: ':id',
                component: RecipeDetailComponent,
                resolve: [RecipesResolverService]
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [RecipesResolverService]
            }
        ]
    }
];

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeStartComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule
    ]
})
export class RecipesModule { }