import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppCoreModule } from './app-core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { RecipesModule } from './recipes/recipes.model';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppCoreModule,
    AppRoutingModule,
    SharedModule,
    RecipesModule,
    ShoppingListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
