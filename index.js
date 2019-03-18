let listDiv = document.getElementById('monster-container')
const buttons = document.getElementById('buttons')
let monsterList = listDiv.children
const form = document.getElementById("create-monster")

//============= monster card function
const monsterCard = (monster) => {
    return `
        <div id="${monster.id}" class="monster">
            <h3 data-name="${monster.name}">${monster.name}</h3>
            <label><strong>Age:</strong></label>
            <p data-name="${monster.age}">${monster.age}</p>
            <label><strong>Description:</strong></label>
            <p data-name="${monster.description}">${monster.description}</p>
        </div>`
}
//============add monster
const createMonster = (monster) => {
    monsterCard(monster)
}

form.addEventListener('submit', (event) => {
    const name = event.target.name.value
    const age = event.target.age.value
    const description = event.target.description.value

    const monsterObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: description
        })
    }
    fetch('http://localhost:3000/monsters', monsterObj)
        .then(res => res.json())
        .then(monster => {
            createMonster(monster)
        })

})


//=========== forward and Back buttons
buttons.addEventListener('click', (event) => {
    let lastDiv = listDiv.lastElementChild.id
    if (event.target.id === "forward") {
        fetch('http://localhost:3000/monsters')
            .then(res => res.json())
            .then(monsters => {
                // let lastDiv = listDiv.lastElementChild.id
                listDiv.innerHTML = ""
                for (i = parseInt(lastDiv); i < parseInt(lastDiv) + 50; i++) {
                    listDiv.innerHTML += monsterCard(monsters[i])
                }
            })
    } else if (event.target.id === "back" && parseInt(listDiv.firstElementChild.id) !== 1) {
        let firstDiv = listDiv.firstElementChild.id
        fetch('http://localhost:3000/monsters')
            .then(res => res.json())
            .then(monsters => {
                listDiv.innerHTML = ""
                for (i = parseInt(firstDiv) - 51; i < parseInt(firstDiv); i++) {
                    listDiv.innerHTML += monsterCard(monsters[i])
                }
            })
    }
})
//============= load first 50 monsters
fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(monsters => {
        for (i = 0; i < 50; i++) {
            listDiv.innerHTML += monsterCard(monsters[i])
        }
    })