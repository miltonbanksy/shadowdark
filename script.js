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
    displayCharacters.innerHTML = '';

    for (c = 1; c <= numberOfCharacters; c++ ) {
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
        
        // Display Style 1 - Bullet List Format //
        /*
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        const title = document.createElement('h3');
        title.textContent = `Character ${c}`;
        characterCard.appendChild(title);

        const statList = document.createElement('ul');

        statNames.forEach((statNames, index) => {
            const li = document.createElement('li');
            li.textContent = `${statNames}: ${allStatsBag[index]}`;
            statList.appendChild(li);
        });

        characterCard.appendChild(statList);
        displayCharacters.appendChild(characterCard);
        */

        // Display Style 2 - Table Format //
        
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        characterCard.innerHTML = `<h3>Character ${c}</h3>`;

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

        characterCard.appendChild(table);
        displayCharacters.appendChild(characterCard);
    }
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

buttonNumberOfCharacters.addEventListener('click', () => {
    const number_of_characters = Number(inputNumberOfCharacters.value);
    generateStatArray(number_of_characters, 6, 3);
});

