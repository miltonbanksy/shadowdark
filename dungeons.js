const dungeon_type = [
    {roll: 2, type: "Cave"},
    {roll: 3, type: "Tomb"},
    {roll: 4, type: "Deep Tunnels"},
    {roll: 6, type: "Ruins"}
]

const site_size = [
    {roll: 2, type: "Small", rooms: 5, dice: () => roll_xdx(5, 10)},
    {roll: 5, type: "Medium", rooms: 8, dice: () => roll_xdx(8, 10)},
    {roll: 6, type: "Large", rooms: 12, dice: () => roll_xdx(12, 10)}
]

const buttonGenerateDungeon = document.getElementById('button-generate-dungeon');
const displayDungeon = document.getElementById('display-dungeon');

function roll_xdx(number_of_dice, size_of_dice) {
    let dicePool = [];
    for (let amount = 0; amount < number_of_dice; amount++) {
        const die = Math.floor(Math.random() * size_of_dice) +1;
        dicePool.push(die);
    }
    return dicePool;
}

function generateDungeonSize() {
    const d6 = roll_xdx(1, 6)[0];
    return site_size.find(s => s.roll >= d6);
}

function generateDungeonType() {
    const d6 = roll_xdx(1, 6)[0];
    console.log(`d6: ${d6}`)
    return dungeon_type.find(s => s.roll >= d6);
}

function generateDungeonDetails() {
    const dungeonType = generateDungeonType();
    const dungeonSize = generateDungeonSize();

    // Safety Net:
    if (!dungeonType || !dungeonSize) {
        throw new Error("Dungeon generation failed: Invalid table result");
    }

    return {
        dungeonType,
        dungeonSize,
        numberOfRooms: dungeonSize.rooms,
        roomKeys: dungeonSize.dice()
    }
}

// LISTENERS
buttonGenerateDungeon.addEventListener('click', () => {
    const dungeonDetails = generateDungeonDetails();

    displayDungeon.innerHTML = `
        ${dungeonDetails.dungeonSize.type} ${dungeonDetails.dungeonType.type} (${dungeonDetails.numberOfRooms} rooms)
        <br>${dungeonDetails.roomKeys}
    `;
});