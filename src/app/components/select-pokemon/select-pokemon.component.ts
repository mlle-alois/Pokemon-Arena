import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-pokemon',
  templateUrl: './select-pokemon.component.html',
  styleUrls: ['./select-pokemon.component.css']
})
export class SelectPokemonComponent implements OnInit {

  pokemons: any[] = [];
  selectedPokemons: any[] = [];

  constructor(private pokemonService: PokemonService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((response: any) => {
      response.results.forEach(res => {
        this.pokemonService.getPokemonByName(res.name).subscribe((resp: any) => {
          this.pokemons.push(resp);
          console.log(resp)
        });
      });
    });
  }

  selectPokemon(pokemon: any) {
    if (this.selectedPokemons.length >= 2) {
      this.selectedPokemons[0] = this.selectedPokemons[1];
    }
    if (this.selectedPokemons.length === 0) {
      this.selectedPokemons[0] = pokemon;
    } else {
      this.selectedPokemons[1] = pokemon;
    }
  }

  goToArena() {
    if (this.selectedPokemons.length >= 2) {
      this.router.navigate(['arena'], {
        queryParams: {
          pokemon1: this.selectedPokemons[0].name,
          pokemon2: this.selectedPokemons[1].name
        }
      })
    }
  }

}
