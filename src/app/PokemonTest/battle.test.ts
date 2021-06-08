import {Battle, Pokemon} from "../modeles";


describe('Combat entre pokemon', () => {
    let pikachu: Pokemon;
    let rattatack: Pokemon;
    let combat1: Battle;
    let dracofeu:Pokemon;

    beforeEach(() => {
       jest.setTimeout(30000);

        pikachu = new Pokemon({
            name: "pika",
            hp: 100,
            speed: 20,
            attack: 15,
            defense: 20
        })

        rattatack = new Pokemon(
            {
                name: "rattatack",
                hp: 80,
                speed: 15,
                attack: 10,
                defense: 30
            });

        dracofeu = new Pokemon(
            {
                name: "dracofeu",
                hp: 120,
                speed: 30,
                attack: 40,
                defense: 40
            });

        combat1 = new Battle({
            poke1: pikachu,
            poke2: rattatack
        })

    })

    it('Dracofeu should win againt pikachu 1', async () => {
        let combat2 = new Battle({
            poke1: pikachu,
            poke2: dracofeu
        })
        expect(await combat2.fight()).toEqual(dracofeu);
    });

    it('Dracofeu should win againt pikachu 2', async () => {
        let combat3 = new Battle({
            poke1: dracofeu,
            poke2: pikachu
        })
        expect(await combat3.fight()).toEqual(dracofeu);
    });

    it('Pikachu should win rattatack', async () => {
        let combat3 = new Battle({
            poke1: rattatack,
            poke2: pikachu
        })
        expect(await combat3.fight()).toEqual(pikachu);
    });




});
