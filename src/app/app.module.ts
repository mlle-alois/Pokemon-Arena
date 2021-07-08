import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {PokemonComponent} from './components/pokemon/pokemon.component';
import {ArenaComponent} from './components/arena/arena.component';
import {LogsComponent} from './components/logs/logs.component';
import {HttpClientModule} from "@angular/common/http";
import { SelectPokemonComponent } from './components/select-pokemon/select-pokemon.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    ArenaComponent,
    LogsComponent,
    SelectPokemonComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
