import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { NotFoundComponent } from "./not-found/not-found.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'recipes',
        loadChildren: () => import('./recipes/recipes.model').then(m => m.RecipesModule)
    },
    {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule)
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
