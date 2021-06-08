import {Pokemon, IPokemon} from "../modeles";


describe('Combat entre pokemon', () => {
  let pikachu: Pokemon;
  let rattatack: Pokemon;
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
    expect(Pokemon.WhichShouldAttack(pikachu, rattatack)).toBe(pikachu);
  });

  it('Pikachu should attack pikachu with 21', () => {
    expect(pikachu.attack1(rattatack)).toBe(21);
  });

  it('rattack should attack pikachu with 14', () => {
    expect(rattatack.attack1(pikachu)).toBe(14);
  });

  it('rattack should attack pikachu and his hp should be 16.8', () => {
    expect(rattatack.attack2(pikachu)).toBe(16.8);
  });

  it('rattack should attack pikachu with 18.2', () => {
    expect(rattatack.attack3(pikachu)).toBe(18.2);
  });

  it('rattack should attack pikachu with 21', () => {
    expect(rattatack.attack4(pikachu)).toBe(21);
  });

  it('rattack should random attack pikachu with message rattatack attack with charge and does 14 damages !', async () => {
    expect(await rattatack.randomAttack(pikachu, 1)).toBe("rattatack attack with charge and does 14 damages !");
  });

  it('rattack should random attack pikachu and his hp should be rattatack attack with rugissement and does 16.8 damages !', async () => {
    expect(await rattatack.randomAttack(pikachu, 2)).toBe("rattatack attack with rugissement and does 16.8 damages !");
  });

  it('rattack should random attack pikachu and his hp should be rattatack attack with vive attaque and does 18.2 damages !', async () => {
    expect(await rattatack.randomAttack(pikachu, 3)).toBe("rattatack attack with vive attaque and does 18.2 damages !");
  });

  it('rattack should random attack pikachu and his hp should be rattatack attack with queue de fer and does 21 damages !', async () => {
    expect(await rattatack.randomAttack(pikachu, 4)).toBe("rattatack attack with queue de fer and does 21 damages !");
  });


});
