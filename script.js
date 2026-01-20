const inputNumberOfCharacters = document.getElementById('input-number-of-characters');
const buttonNumberOfCharacters = document.getElementById('button-number-of-characters');
const displayCharacters = document.getElementById('display-characters');

const statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

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

