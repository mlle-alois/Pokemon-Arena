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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ReactiveFormsModule} from "@angular/forms";

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
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
