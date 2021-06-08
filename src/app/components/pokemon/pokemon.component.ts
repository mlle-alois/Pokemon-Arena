import {Component, OnInit} from '@angular/core';
import {Pokemon} from "../../modeles";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
public pikachu:Pokemon;
public rattatack:Pokemon;
  constructor() {
  this.pikachu = new Pokemon({
      name: "pika",
      hp: 100,
      speed: 20,
      attack: 15,
      defense: 20
    })

    this.rattatack = new Pokemon(
      {
        name: "rattatack",
        hp: 80,
        speed: 15,
        attack: 10,
        defense: 30
      });


  }

  ngOnInit(): void {
  }

}
