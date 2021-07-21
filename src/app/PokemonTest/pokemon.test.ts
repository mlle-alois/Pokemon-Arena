import {Pokemon} from "../modeles";
import {PokemonService} from "../services/pokemon.service";

describe('Combat entre pokemon', () => {
  let pikachu: Pokemon;
  let rattatack: Pokemon;
  //TODO comment initialiser le service ?
  let pokemonService: PokemonService;
  beforeEach(() => {
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
  })


  it('Pikachu should attack first againt rattatack', () => {
    expect(PokemonService.WhichShouldAttack(pikachu, rattatack)).toBe(pikachu);
  });

  it('Pikachu should attack pikachu with 21', () => {
    expect(pokemonService.attack1(rattatack, pikachu)).toBe(21);
  });

  it('rattack should attack pikachu with 14', () => {
    expect(pokemonService.attack1(pikachu, rattatack)).toBe(14);
  });

  it('rattack should attack pikachu and his hp should be 16.8', () => {
    expect(pokemonService.attack2(pikachu, rattatack)).toBe(16.8);
  });

  it('rattack should attack pikachu with 18.2', () => {
    expect(pokemonService.attack3(pikachu, rattatack)).toBe(18.2);
  });

  it('rattack should attack pikachu with 21', () => {
    expect(pokemonService.attack4(pikachu, rattatack)).toBe(21);
  });

  it('rattack should random attack pikachu with message rattatack attack with charge and does 14 damages !', async () => {
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
  });


});
