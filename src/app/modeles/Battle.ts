import {Pokemon} from "./pokemon";

export interface IBattle {
    poke1:Pokemon
    poke2:Pokemon
}

export class Battle implements IBattle{
    poke1:Pokemon
    poke2:Pokemon

    constructor(props:IBattle) {
        this.poke1 = props.poke1;
        this.poke2 = props.poke2;
    }

    async fight(): Promise<Pokemon> {
        while (this.checkIfBothPokemonAreAlive()) {
            await this.fightOneTurn();
        }
        return await this.CheckIfThereWinner();
    }

    private async fightOneTurn() : Promise<void>{
        const pokeTurn = Pokemon.WhichShouldAttack(this.poke1, this.poke2);
        if(pokeTurn == this.poke1) {
        await this.poke1.randomAttack(this.poke2);
        await this.poke2.randomAttack(this.poke1);
    } else {
            await this.poke2.randomAttack(this.poke1);
            await this.poke1.randomAttack(this.poke2);
        }
    }

    private checkIfBothPokemonAreAlive():boolean{
        return this.poke1.hp > 0 && this.poke2.hp > 0;
    }
    private async CheckIfThereWinner():Promise<Pokemon>{
      if (this.poke1.hp <= 0){
          return Promise.resolve(this.poke2);
      }
      return Promise.resolve(this.poke1);
    }


}
