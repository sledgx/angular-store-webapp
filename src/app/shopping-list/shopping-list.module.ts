import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path: '',
        component: ShoppingListComponent
    }
];

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule
    ]
})
export class ShoppingListModule { }