import { Injectable } from '@angular/core';
import {Pokemon} from "../modeles";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) {
  }
  private _attack = "attack";

  static WhichShouldAttack(poke1: Pokemon, poke2: Pokemon): Pokemon {
    return poke1.speed >= poke2.speed ? poke1 : poke2;
  }

  private calculateAttack(poke1: Pokemon,poke2: Pokemon): number {
    return (poke2.attack  / (poke1.defense / 10));
  }

  attack1(poke1: Pokemon, poke2: Pokemon): number {
    let damages = this.calculateAttack(poke1, poke2);
    poke1.hp = (poke1.hp - damages > 0) ? poke1.hp - damages : 0;
    return damages;
//    return (poke1.hp -= this.calculateAttack(poke1)) > 0 ? poke1.hp : 0;

  }

  attack2(poke1: Pokemon, poke2: Pokemon): number {
    let damages = this.calculateAttack(poke1, poke2) * 1.2;
    poke1.hp = (poke1.hp - damages > 0) ? poke1.hp - damages : 0;
    // return (poke1.hp -= (this.calculateAttack(poke1)) * 1.5) > 0 ? poke1.hp : 0;
    return damages;
    //return (poke1.hp -= (this.calculateAttack(poke1)) * 1.2) > 0 ? poke1.hp : 0;
  }

  attack3(poke1: Pokemon, poke2: Pokemon): number {
    let damages = this.calculateAttack(poke1, poke2) * 1.3;
    poke1.hp = (poke1.hp - damages > 0) ? poke1.hp - damages : 0;

    return damages;
    // return (poke1.hp -= (this.calculateAttack(poke1)) * 1.3) > 0 ? poke1.hp : 0;
  }

  attack4(poke1: Pokemon, poke2: Pokemon): number {
    let damages = this.calculateAttack(poke1, poke2) * 1.5;
    poke1.hp = (poke1.hp - damages > 0) ? poke1.hp - damages : 0;
    // return (poke1.hp -= (this.calculateAttack(poke1)) * 1.5) > 0 ? poke1.hp : 0;
    return damages;
  }

  async randomAttack(poke1: Pokemon, poke2: Pokemon, forcedNumber?: number): Promise<string[]> {

    if (poke2.hp > 0 && poke1.hp > 0) {
      let randomAttack = this.returnAttackUsed(forcedNumber);
      // let promise = await new Promise(resolve => setTimeout(resolve, 1000));
      let result: any;

      return new Promise(resolve => {
        setTimeout(() => {
          result = this[randomAttack](poke1, poke2);
          console.log()
          resolve([poke2.name + " attack with " + poke2[randomAttack+"Name"] + " and does " + result + " damages !", poke2.color ? "color:" + poke2.color : "color:black"])
        }, 1000);
      });
    } else {
      return new Promise(resolve => {
        let winner:Pokemon = poke1.hp > 0 ? poke1 : poke2
        setTimeout(() => {
          resolve(
            [winner.name + " wins !!", "color:red"])
        }, 1000);
      });

    }
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

}
