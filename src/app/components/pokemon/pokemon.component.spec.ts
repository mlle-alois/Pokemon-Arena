import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PokemonComponent} from './pokemon.component';
import {Pokemon} from "../../modeles";

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    component.pokemon = new Pokemon({
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
