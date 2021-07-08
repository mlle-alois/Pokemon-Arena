import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";

@Component({
  selector: 'app-select-pokemon',
  templateUrl: './select-pokemon.component.html',
  styleUrls: ['./select-pokemon.component.css']
})
export class SelectPokemonComponent implements OnInit {

  pokemons: any[] = [];
  selectedPokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {
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
    if(this.selectedPokemons.length >= 2) {
      this.selectedPokemons[0] = this.selectedPokemons[1];
    }
    this.selectedPokemons[1] = pokemon;
    console.log(this.selectedPokemons)
  }

}
