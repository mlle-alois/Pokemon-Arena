import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ArenaComponent} from './arena.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Pokemon} from "../../modeles";

describe('ArenaComponent', () => {
  let component: ArenaComponent;
  let fixture: ComponentFixture<ArenaComponent>;

  let pikachu: Pokemon;
  let rattatack: Pokemon;
  let dracofeu: Pokemon;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArenaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArenaComponent);
    component = fixture.componentInstance;

    jest.setTimeout(30000);

    pikachu = new Pokemon({
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

    rattatack = new Pokemon(
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
    dracofeu = new Pokemon(
      {
        name: "dracofeu",
        hp: 120,
        speed: 30,
        attack: 40,
        defense: 40,
        attack1Name: "charge",
        attack2Name: "boule de feu",
        attack3Name: "griffes",
        attack4Name: "souffle brulant"
      });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Dracofeu should win againt pikachu 1', async () => {

    component.pokemon1 = pikachu;
    component.pokemon2 = dracofeu;

    expect(await component.fight()).toEqual(dracofeu);
  });

  it('Dracofeu should win againt pikachu 2', async () => {

    component.pokemon1 = dracofeu;
    component.pokemon2 = pikachu;

    expect(await component.fight()).toEqual(dracofeu);
  });

  it('Pikachu should win rattatack', async () => {

    component.pokemon1 = rattatack;
    component.pokemon2 = pikachu;

    expect(await component.fight()).toEqual(pikachu);
  });

});
