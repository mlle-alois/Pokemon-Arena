import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../../modeles";
import {PokemonService} from "../../services/pokemon.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {
  public pokemon1: Pokemon;
  public pokemon2: Pokemon;
  public actions;
  public isFightStarted: boolean = false;
  public currentDate: Date;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pokemonService.getPokemonByName(params['pokemon1']).subscribe((pokemon: any) => {
        let moves:string[] = this.returnRandomPokemonAttacksNames(pokemon);
        this.pokemon1 = new Pokemon({
          name: pokemon.name,
          hp: pokemon.stats[0].base_stat,
          speed: pokemon.stats[5].base_stat,
          attack: pokemon.stats[1].base_stat,
          defense: pokemon.stats[2].base_stat,
          color: "green",
          attack1Name: moves[0],
          attack2Name: moves[1],
          attack3Name: moves[2],
          attack4Name: moves[3],
          defaultImagePath: pokemon.sprites.back_default
        });
      })
      this.pokemonService.getPokemonByName(params['pokemon2']).subscribe((pokemon: any) => {
        let moves:string[] = this.returnRandomPokemonAttacksNames(pokemon);
        this.pokemon2 = new Pokemon({
          name: pokemon.name,
          hp: pokemon.stats[0].base_stat,
          speed: pokemon.stats[5].base_stat,
          attack: pokemon.stats[1].base_stat,
          defense: pokemon.stats[2].base_stat,
          color: "black",
          attack1Name: moves[0],
          attack2Name: moves[1],
          attack3Name: moves[2],
          attack4Name: moves[3],
          defaultImagePath: pokemon.sprites.front_default
        });
      })
    });

    this.actions = [];
  }

  async fight(): Promise<Pokemon> {
    this.isFightStarted = true;
    this.currentDate = new Date();
    while (this.checkIfBothPokemonAreAlive()) {
      await this.fightOneTurn();
    }
    return await this.CheckIfThereWinner();
  }

  private async fightOneTurn(): Promise<void> {
    const pokeTurn = PokemonService.WhichShouldAttack(this.pokemon1, this.pokemon2);
    let res1;
    let res2;
    if (pokeTurn == this.pokemon1) {
      res1 = await this.pokemonService.randomAttack(this.pokemon2, this.pokemon1);
      this.actions.push([res1[0], res1[1]]);
      res2 = await this.pokemonService.randomAttack(this.pokemon1, this.pokemon2);
      this.actions.push([res2[0], res2[1]]);
    } else {
      res1 = await this.pokemonService.randomAttack(this.pokemon1, this.pokemon2);
      this.actions.push([res1[0], res1[1]]);
      res2 = await this.pokemonService.randomAttack(this.pokemon2, this.pokemon1);
      this.actions.push([res2[0], res2[1]]);
    }

  }

  private checkIfBothPokemonAreAlive(): boolean {
    return this.pokemon1.hp > 0 && this.pokemon2.hp > 0;
  }

  private async CheckIfThereWinner(): Promise<Pokemon> {
    if (this.pokemon1.hp <= 0) {
      //change image to dead
      ///this.pokemon1.defaultImagePath="assets/grave.png";
      return Promise.resolve(this.pokemon2);
    }
    //this.pokemon2.defaultImagePath="assets/grave.png";
    return Promise.resolve(this.pokemon1);
  }

  private returnRandomPokemonAttacksNames(pokemon:any): string[]{
   let result:string[] = [];
   let resultTemp:string[];
   let movesLength:number = pokemon.moves.length;
    resultTemp = pokemon.moves.map(move => {return move.move.name
    })
    if(movesLength <= 5){
      resultTemp.pop();
      result = resultTemp;
       return result;
    }
    result.push(resultTemp[Math.floor(Math.random() * movesLength/4)])
    result.push(resultTemp[Math.floor(Math.random() * (movesLength/4*2 - movesLength/4))])
    result.push(resultTemp[Math.floor(Math.random() * (movesLength/4*3 - movesLength/4*2))])
    result.push(resultTemp[Math.floor(Math.random() * (movesLength-1 - movesLength/4*3))])
    return result;
    }

}
