const width = 8
const board = document.getElementById("game")
const scoreDisplay = document.getElementById("score")
const goldDisplay = document.getElementById("gold")

let score = 0
let gold = 0
let selected = null
let tiles = []

const candies = [
    "images/morango.png",
    "images/chocolate.png",
    "images/limao.png",
    "images/uva.png",
    "images/bala_azul.png",
    "images/pirulito.png"
]

function createBoard() {
    for (let i = 0; i < width * width; i++) {
        const tile = document.createElement("div")
        tile.setAttribute("id", i)
        tile.classList.add("tile")

        let random = Math.floor(Math.random() * candies.length)
        tile.style.backgroundImage = `url(${candies[random]})`

        tile.addEventListener("click", handleClick)

        board.appendChild(tile)
        tiles.push(tile)
    }
}

function handleClick() {
    if (!selected) {
        selected = this
        this.style.border = "2px solid yellow"
    } else {
        swapTiles(selected, this)
        selected.style.border = "none"
        selected = null
    }
}

function swapTiles(tile1, tile2) {
    const temp = tile1.style.backgroundImage
    tile1.style.backgroundImage = tile2.style.backgroundImage
    tile2.style.backgroundImage = temp
}

function checkMatches() {
    for (let i = 0; i < 64; i++) {

        const row = [i, i+1, i+2]
        if (i % 8 < 6) {
            let color = tiles[i].style.backgroundImage
            if (color !== "" &&
                row.every(index => tiles[index].style.backgroundImage === color)) {
                row.forEach(index => tiles[index].style.backgroundImage = "")
                score += 10
            }
        }

        const col = [i, i+8, i+16]
        if (i < 48) {
            let color = tiles[i].style.backgroundImage
            if (color !== "" &&
                col.every(index => tiles[index].style.backgroundImage === color)) {
                col.forEach(index => tiles[index].style.backgroundImage = "")
                score += 10
            }
        }
    }
    scoreDisplay.textContent = score
}

function dropCandies() {
    for (let i = 55; i >= 0; i--) {
        if (tiles[i + 8].style.backgroundImage === "") {
            tiles[i + 8].style.backgroundImage = tiles[i].style.backgroundImage
            tiles[i].style.backgroundImage = ""
        }
    }

    for (let i = 0; i < 8; i++) {
        if (tiles[i].style.backgroundImage === "") {
            let random = Math.floor(Math.random() * candies.length)
            tiles[i].style.backgroundImage = `url(${candies[random]})`
        }
    }
}

setInterval(() => {
    checkMatches()
    dropCandies()
}, 200)

function openCode() {
    const code = prompt("Digite o código secreto:")
    if (code === "Pedro123") {
        gold = 999999
        goldDisplay.textContent = gold
        alert("Modo Supremo ativado")
    }
}

createBoard()
