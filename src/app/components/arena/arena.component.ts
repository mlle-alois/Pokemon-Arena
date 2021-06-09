import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../../modeles";

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {
  public pokemon1: Pokemon;
  public pokemon2: Pokemon;
  public actions;
//  battle: Battle;

  constructor() {
  }

  ngOnInit(): void {

    this.pokemon1 = new Pokemon({
      name: "pika",
      hp: 100,
      speed: 20,
      attack: 15,
      defense: 20,
      attack1Name: "charge",
      attack2Name: "éclair",
      attack3Name: "vive attaque",
      attack4Name: "queue de fer"
    })

    this.pokemon2 = new Pokemon(
      {
        name: "rattatack",
        hp: 80,
        speed: 15,
        attack: 10,
        defense: 30,
        attack1Name: "charge",
        attack2Name: "rugissement",
        attack3Name: "vive attaque",
        attack4Name: "queue de fer"

      });
   /* this.battle = new Battle({
      poke1: this.pokemon1,
      poke2: this.pokemon2
    })*/
    this.actions = [];
  }

  async fight(): Promise<Pokemon> {
    while (this.checkIfBothPokemonAreAlive()) {
      await this.fightOneTurn();
    }
    return await this.CheckIfThereWinner();
  }

  private async fightOneTurn(): Promise<void> {
    const pokeTurn = Pokemon.WhichShouldAttack(this.pokemon1, this.pokemon2);
    let res1;
    let res2;
    if (pokeTurn == this.pokemon1) {
      res1 = await this.pokemon1.randomAttack(this.pokemon2);
      this.actions.push([res1[0],res1[1]]);
      res2 = await this.pokemon2.randomAttack(this.pokemon1);
      this.actions.push([res2[0],res2[1]]);
    } else {
       res1 = await this.pokemon2.randomAttack(this.pokemon1);
      this.actions.push([res1[0],res1[1]]);
       res2 = await this.pokemon1.randomAttack(this.pokemon2);
      this.actions.push([res2[0],res2[1]]);
    }

  }

  private checkIfBothPokemonAreAlive(): boolean {
    return this.pokemon1.hp > 0 && this.pokemon2.hp > 0;
  }

  private async CheckIfThereWinner(): Promise<Pokemon> {
    if (this.pokemon1.hp <= 0) {
      return Promise.resolve(this.pokemon2);
    }
    return Promise.resolve(this.pokemon1);
  }

}
