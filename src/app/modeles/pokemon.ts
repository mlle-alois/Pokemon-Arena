export interface IPokemon {
  name: string;
  hp: number;
  speed: number;
  attack: number;
  defense: number;
  attack1Name: string;
  attack2Name: string;
  attack3Name: string;
  attack4Name: string;
  color?: string;
  defaultImagePath?: string;
  initialHP?: number;
}

export class Pokemon implements IPokemon {
  name: string;
  hp: number;
  attack: number;
  speed: number;
  defense: number;
  attack1Name: string;
  attack2Name: string;
  attack3Name: string;
  attack4Name: string;
  color?: string;
  defaultImagePath?: string;
  initialHp?: number;

  constructor(props: IPokemon) {
    this.name = props.name;
    this.hp = props.hp;
    this.speed = props.speed;
    this.attack = props.attack
    this.defense = props.defense;

    this.attack1Name = props.attack1Name;
    this.attack2Name = props.attack2Name;
    this.attack3Name = props.attack3Name;
    this.attack4Name = props.attack4Name;
    this.color = props.color;
    this.defaultImagePath = props.defaultImagePath;
    this.initialHp = props.hp;

  }


}
