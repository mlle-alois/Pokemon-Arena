import {Injectable} from '@angular/core';
import {Pokemon} from "../modeles";
import {HttpClient} from "@angular/common/http";
import {interval, Observable} from "rxjs";
import {map, takeWhile} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public pokemon1: Pokemon;
  public pokemon2: Pokemon;

  public isBattleOver: boolean = false;
  public actions: string[][] = [];

  constructor(private http: HttpClient) {
  }

  private _attack = "attack";

  private whichShouldAttack(): Pokemon[] {
    return this.pokemon1.speed >= this.pokemon2.speed ? [this.pokemon1, this.pokemon2] : [this.pokemon2, this.pokemon1];
  }

  private static calculateAttack(poke1: Pokemon, poke2: Pokemon): number {
    return (poke2.attack / (poke1.defense / 10));
  }

  attack1(poke1: Pokemon, poke2: Pokemon): number {
    let damages = PokemonService.calculateAttack(poke1, poke2);
    poke1.hp = (poke1.hp - damages > 0) ? poke1.hp - damages : 0;
    return damages;

  }

  attack2(poke1: Pokemon, poke2: Pokemon): number {
    let damages = PokemonService.calculateAttack(poke1, poke2) * 1.2;
    poke1.hp = (poke1.hp - damages > 0) ? poke1.hp - damages : 0;
    return damages;
  }

  attack3(poke1: Pokemon, poke2: Pokemon): number {
    let damages = PokemonService.calculateAttack(poke1, poke2) * 1.3;
    poke1.hp = (poke1.hp - damages > 0) ? poke1.hp - damages : 0;

    return damages;

  }

  attack4(poke1: Pokemon, poke2: Pokemon): number {
    let damages = PokemonService.calculateAttack(poke1, poke2) * 1.5;
    poke1.hp = (poke1.hp - damages > 0) ? poke1.hp - damages : 0;
    return damages;
  }

  fight(): Observable<string[][]> {
    return interval(1000).pipe(map(() => this.round()), takeWhile(() =>
      !this.isBattleOver
    ))
  }


  round(forcedNumber?: number): string[][] {

    if (this.BothPokemonAreAlive()) {
      const pokemonsInAttackOrder: Pokemon[] = this.whichShouldAttack();
      this.attackAndAddResultToLog(pokemonsInAttackOrder[0], pokemonsInAttackOrder[1], forcedNumber);
      this.attackAndAddResultToLog(pokemonsInAttackOrder[1], pokemonsInAttackOrder[0], forcedNumber);

    } else {
      let winner: Pokemon = this.pokemon1.hp > 0 ? this.pokemon1 : this.pokemon2;
      this.actions.push([winner.name.toUpperCase() + " WINS !!", "color:orange"]);
      this.isBattleOver = true;
    }
    return this.actions;
  }

  private returnAttackUsed(forcedNumber?: number): string {
    if (forcedNumber !== undefined && forcedNumber < 5 && forcedNumber > 0)
      return this._attack + forcedNumber;
    let attack = this._attack;
    attack += Math.floor(Math.random() * 4) + 1;
    return attack;
  }

  getPokemons() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=10`)
  }

  getPokemonByName(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  }

  private BothPokemonAreAlive(): boolean {
    return this.pokemon1.hp > 0 && this.pokemon2.hp > 0;
  }


  private attackAndAddResultToLog(poke1: Pokemon, poke2: Pokemon, forcedNumber?: number) {
    if (this.BothPokemonAreAlive()) {
      let randomAttack = this.returnAttackUsed(forcedNumber);
      let attack = this[randomAttack](poke1, poke2);
      attack = Math.round(attack * 100) / 100
      this.actions.push([poke2.name + " attack with " + poke2[randomAttack + "Name"] + " and does "
      + attack + " damages !", poke2.color ? "color:" + poke2.color : "color:black"]);

    }
  }
}
