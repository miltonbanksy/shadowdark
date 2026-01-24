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
    const stats = {};

    statNames.forEach(statName => {
        let rolls = [];

        for (let d = 0; d < 3; d++) {
            rolls.push(roll_1dx(6));
        }

        const value = rolls.reduce((a, b) => a + b, 0);
        const mod = getModifier(value);

        stats[statName] = {
            value: value,
            mod: mod
        };
    });

    return stats;
}

function generateAncestry() {
    const dieRoll = roll_1dx(12);

    const ancestry = ancestryData.find(item => item.d12_target >= dieRoll);
    console.log(ancestry.ancestry);
    
    return ancestry;
}

function generateHitPoints(stats, ancestry) {
    const conMod = stats.Constitution.mod;
    const baseHP = conMod < 1 ? 1 : conMod;
    const ancestryBonus = ancestry.hp_bonus ?? 0;

    return baseHP + ancestryBonus;
}

function generateCharacter() {
    const ancestry = generateAncestry();
    const stats = generateStats();
    const hitPoints = generateHitPoints(stats, ancestry);

    return {
        ancestry,
        stats,
        hitPoints
    };
}


// LISTENERS

buttonNumberOfCharacters.addEventListener('click', () => {
    
    displayCharacters.innerHTML = '';

    const numberOfCharacters = Number(inputNumberOfCharacters.value);
    
    let ancestry = "";
    let ancestryBag = [];
    
    for (c = 1; c <= numberOfCharacters; c++ ) {

        ancestryBag.push(ancestry);
        
        const character = generateCharacter();

        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        const cardTitle = document.createElement('h3');
        
        const table = document.createElement('table');

        statNames.forEach(statName => {
            const stat = character.stats[statName];

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${statName}</td>
                <td>${stat.value}</td>
                <td>${stat.mod >= 0 ? '+' : ''}${stat.mod}</td>
            `;
            table.appendChild(row);
        });

        cardTitle.innerHTML = `Level 0 ${character.ancestry.ancestry}, HP${character.hitPoints}/${character.hitPoints}`;
        const cardNotes = document.createElement('p');
        cardNotes.innerHTML = character.ancestry.notes;

        characterCard.appendChild(cardTitle);
        characterCard.appendChild(table);
        characterCard.appendChild(cardNotes);
        displayCharacters.appendChild(characterCard);
    }
});

