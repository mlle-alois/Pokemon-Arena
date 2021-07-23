import {Pokemon} from "../modeles";
import {TestBed} from '@angular/core/testing';
import {PokemonService} from "../services/pokemon.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PokemonService', () => {
  let pikachu: Pokemon;
  let rattatack: Pokemon;
  let pokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });

    pokemonService = TestBed.inject(PokemonService);

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

    pokemonService.pokemon1 = pikachu;
    pokemonService.pokemon2 = rattatack;

  });

  it('rattack should attack pikachu with 5', () => {
    expect(pokemonService.attack1(rattatack, pikachu)).toBe(5);
  });

  it('pikachu should attack rattack with 5', () => {
    expect(pokemonService.attack1(pikachu, rattatack)).toBe(5);
  });

  it('rattack should attack pikachu and his hp should be 6', () => {
    expect(pokemonService.attack2(pikachu, rattatack)).toBe(6);
  });

  it('rattack should attack pikachu with 6.5', () => {
    expect(pokemonService.attack3(pikachu, rattatack)).toBe(6.5);
  });

  it('rattack should attack pikachu with 7.5', () => {
    expect(pokemonService.attack4(pikachu, rattatack)).toBe(7.5);
  });

  it('fight should return actions', () => {
    const subscriber = pokemonService.fight()
      .subscribe(
        (actions) => {
          expect(actions).toBe(["rattatack WINS !!"]);
          subscriber.unsubscribe();
        })
  });

  it('round should return action', () => {
    expect((pokemonService.round()).length).toBe(2);
  });

  it('should return 10 pokemons', () => {
    const subscriber = pokemonService.getPokemons().subscribe((resp) => {
        expect(resp.length).toBe(10);
        subscriber.unsubscribe();
      });
    
  });

  it('should return pokemon pikachu with hp 30', () => {
    const subscriber = pokemonService.getPokemonByName("pikachu").subscribe((resp: any) => {
        expect(resp.name).toBe("pikachu");
        expect(resp.stats[0].base_stat).toBe(30); 
        subscriber.unsubscribe();
      });
  });

  /*it('rattack should random attack pikachu with message rattatack attack with charge and does 14 damages !', async () => {
    expect(await pokemonService.randomAttack(pikachu, rattatack, 1)).toBe("rattatack attack with charge and does 14 damages !");
  });

  it('rattack should random attack pikachu and his hp should be rattatack attack with rugissement and does 16.8 damages !', async () => {
    expect(await pokemonService.randomAttack(pikachu, rattatack, 2)).toBe("rattatack attack with rugissement and does 16.8 damages !");
  });

  it('rattack should random attack pikachu and his hp should be rattatack attack with vive attaque and does 18.2 damages !', async () => {
    expect(await pokemonService.randomAttack(pikachu, rattatack, 3)).toBe("rattatack attack with vive attaque and does 18.2 damages !");
  });

  it('rattack should random attack pikachu and his hp should be rattatack attack with queue de fer and does 21 damages !', async () => {
    expect(await pokemonService.randomAttack(pikachu, rattatack, 4)).toBe("rattatack attack with queue de fer and does 21 damages !");
  });*/

//   it('should return 10 pokemons', () => {
//     expect(pokemonService.getPokemons().length).toBe(10);
//   });

});
