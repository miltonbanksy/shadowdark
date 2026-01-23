// HTML ELEMENTS
const inputNumberOfCharacters = document.getElementById('input-number-of-characters');
const buttonNumberOfCharacters = document.getElementById('button-number-of-characters');
const displayCharacters = document.getElementById('display-characters');

const statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

let ancestryData = [];

// fetch json files
fetch('ancestry.json').then(res => res.json()).then(data => ancestryData = data);
fetch('statsAndMods.json').then(res => res.json()).then(data => statsAndMods = data);


// Breaking this function down... down!
function generateStatArray(numberOfCharacters, numberOfStats, numberOfDice) {
    
        
    const characterCard = document.createElement('div');
    characterCard.classList.add('character-card');

    characterCard.innerHTML = `<h3>Level 0 ${ancestry.ancestry}</h3>`;

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

    const ancestryDescription = document.createElement('p');
    ancestryDescription.innerHTML = ancestry.notes;

    characterCard.appendChild(table);
    characterCard.appendChild(ancestryDescription);
    displayCharacters.appendChild(characterCard);
    }

function getModifier(stat) {
    return statsAndMods.find(s => s.stat === stat).mod;
}

function displayArrayOfObjects(array) {
    displayCharacters.innerHTML = '';

    array.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        let content = '';
        for (const key in item) {
            if (Object.hasOwnProperty.call(item, key)) {
                const value = item[key];
                content += `<strong>${key}:</strong> ${value}<br>`;
            }
        }
        itemDiv.innerHTML = content;

        displayCharacters.appendChild(itemDiv);
    })
}

function roll_1dx(dieSize) { // Roll a single polyhedral die
    return Math.floor(Math.random() * dieSize ) + 1;
}

function generateStats() {
    let allStatsBag = [];
    
        for ( s = 1; s <= 6; s++ ) { // 6 stats for each character
            let oneStatBag = [];
            
            for ( d = 1; d <= 3; d++ ) { // roll 3 dice for each stat
                const threeDice = roll_1dx(3);
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

buttonNumberOfCharacters.addEventListener('click', () => {
    
    displayCharacters.innerHTML = '';
    createDisplay();

    const numberOfCharacters = Number(inputNumberOfCharacters.value);
    
    let ancestryBag = [];
    
    //generateStatArray(number_of_characters, 6, 3);

    for (c = 1; c <= numberOfCharacters; c++ ) {
        let ancestry = generateAncestry(roll_1dx(12));
        ancestryBag.push(ancestry);
        allStatsBag = generateStats();
        console.log(allStatsBag);
    }
});

