const inputNumberOfCharacters = document.getElementById('input-number-of-characters');
const buttonNumberOfCharacters = document.getElementById('button-number-of-characters');
const displayCharacters = document.getElementById('display-characters');

const statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
const statsAndMods = [
    {stat: 1, mod: -4},
    {stat: 2, mod: -4},
    {stat: 3, mod: -4},
    {stat: 4, mod: -3},
    {stat: 5, mod: -3},
    {stat: 6, mod: -2},
    {stat: 7, mod: -2},
    {stat: 8, mod: -1},
    {stat: 9, mod: -1},
    {stat: 10, mod: 0},
    {stat: 11, mod: 0},
    {stat: 12, mod: 1},
    {stat: 13, mod: 1},
    {stat: 14, mod: 2},
    {stat: 15, mod: 2},
    {stat: 16, mod: 3},
    {stat: 17, mod: 3},
    {stat: 18, mod: 4}
];

function generateStatArray(numberOfCharacters, numberOfStats, numberOfDice) {
    let characters = [];

    for (c = 1; c <= numberOfCharacters; c++ ) {
        const characterCard = document.createElement('p');
        let allStatsBag = [];
    
        for ( s = 1; s <= numberOfStats; s++ ) {
            let oneStatBag = [];
            
            for ( d = 1; d <= numberOfDice; d++ ) {
                const threeDice = Math.floor(Math.random() * 6) + 1;
                oneStatBag.push(threeDice);
            }
            
            const sumThreeDice = oneStatBag.reduce((acc, curr) => acc + curr, 0);
            allStatsBag.push(sumThreeDice);
        }

        console.log(`Stats: ${allStatsBag}`);
        
        const combinedStats = Object.fromEntries(
            statNames.map((key, index) => [key, allStatsBag[index]])
        );

        console.log(combinedStats);
        characters.push(combinedStats);
        characterCard.appendChild(characters.keys);
        displayCharacters.appendChild(characterCard);
    }
    
    console.log(characters);
}

buttonNumberOfCharacters.addEventListener('click', () => {
    const number_of_characters = Number(inputNumberOfCharacters.value);
    generateStatArray(number_of_characters, 6, 3);
});

