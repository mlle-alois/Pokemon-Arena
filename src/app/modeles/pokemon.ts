export interface IPokemon {
  name: string;
  hp: number;
  speed: number;
  attack: number;
  defense: number;
  primaryAttachName: string;
  secondaryAttackName: string;
  thirdAttackName: string;
  fourthAttackName: string;
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
  primaryAttachName: string;
  secondaryAttackName: string;
  thirdAttackName: string;
  fourthAttackName: string;
  color?: string;
  defaultImagePath?: string;
  initialHp?: number;

  constructor(props: IPokemon) {
    this.name = props.name;
    this.hp = props.hp;
    this.speed = props.speed;
    this.attack = props.attack
    this.defense = props.defense;

    this.primaryAttachName = props.primaryAttachName;
    this.secondaryAttackName = props.secondaryAttackName;
    this.thirdAttackName = props.thirdAttackName;
    this.fourthAttackName = props.fourthAttackName;
    this.color = props.color;
    this.defaultImagePath = props.defaultImagePath;
    this.initialHp = props.hp;

  }


}
