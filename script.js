// HTML ELEMENTS
const inputNumberOfCharacters = document.getElementById('input-number-of-characters');
const buttonNumberOfCharacters = document.getElementById('button-number-of-characters');
const displayCharacters = document.getElementById('display-characters');

const statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

let ancestryData = [];

// fetch json files
fetch('ancestry.json').then(res => res.json()).then(data => ancestryData = data);
fetch('statsAndMods.json').then(res => res.json()).then(data => statsAndMods = data);


function getModifier(stat) {
    return statsAndMods.find(s => s.stat === stat).mod;
}

function roll_1dx(dieSize) { // Roll a single polyhedral die
    return Math.floor(Math.random() * dieSize ) + 1;
}

function generateStats() {
    let allStatsBag = [];
    
        for ( s = 1; s <= 6; s++ ) { // 6 stats for each character
            let oneStatBag = [];
            
            for ( d = 1; d <= 3; d++ ) { // roll 3 dice for each stat
                const threeDice = roll_1dx(6);
                oneStatBag.push(threeDice);
            }
            
            const sumThreeDice = oneStatBag.reduce((acc, curr) => acc + curr, 0);
            allStatsBag.push(sumThreeDice);
        }
        return allStatsBag;
}

function generateAncestry() {
    const dieRoll = roll_1dx(12);

    const ancestry = ancestryData.find(item => item.d12_target >= dieRoll);
    console.log(ancestry.ancestry);
    
    return ancestry;
}

function generateHitPoints() {

}


// LISTENERS

buttonNumberOfCharacters.addEventListener('click', () => {
    
    displayCharacters.innerHTML = '';

    const numberOfCharacters = Number(inputNumberOfCharacters.value);
    
    let ancestry = "";
    let ancestryBag = [];
    
    for (c = 1; c <= numberOfCharacters; c++ ) {

        ancestry = generateAncestry();
        ancestryBag.push(ancestry);
        allStatsBag = generateStats();

        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        const cardTitle = document.createElement('h3');
        
        const table = document.createElement('table');

        statNames.forEach((statName, index) => {

            const statValue = allStatsBag[index];
            const mod = getModifier(statValue);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${statName}</td>
                <td>${statValue}</td>
                <td>(${mod >= 0 ? '+' : ''}${mod})</td>
            `;
            table.appendChild(row);
        });
        cardTitle.innerHTML = `Level 0 ${ancestry.ancestry}`;
        const cardNotes = document.createElement('p');
        cardNotes.innerHTML = ancestry.notes;

        characterCard.appendChild(cardTitle);
        characterCard.appendChild(table);
        characterCard.appendChild(cardNotes);
        displayCharacters.appendChild(characterCard);
        console.log(allStatsBag);
    }
});

