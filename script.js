const width = 8
const board = document.getElementById("game")
const scoreDisplay = document.getElementById("score")
const goldDisplay = document.getElementById("gold")

let score = 0
let gold = parseInt(localStorage.getItem("gold")) || 0
let faseAtual = parseInt(localStorage.getItem("fase")) || 1
let movimentos = 20

let martelo = 0
let bomba = 0
let troca = 0

let modoItem = null
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

function salvar() {
    localStorage.setItem("gold", gold)
    localStorage.setItem("fase", faseAtual)
}

function createBoard() {
    board.innerHTML = ""
    tiles = []

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

    if (modoItem === "martelo") {
        this.style.backgroundImage = ""
        martelo--
        modoItem = null
        atualizarUI()
        return
    }

    if (modoItem === "bomba") {
        let id = parseInt(this.id)
        let area = [id, id+1, id-1, id+8, id-8]
        area.forEach(i=>{
            if(tiles[i]) tiles[i].style.backgroundImage=""
        })
        bomba--
        modoItem = null
        atualizarUI()
        return
    }

    if (!selected) {
        selected = this
        this.style.border = "2px solid yellow"
    } else {
        swapTiles(selected, this)
        selected.style.border = "none"
        selected = null
        movimentos--
        verificarFim()
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

function verificarFim() {
    if (movimentos <= 0) {
        if (score >= 1000 + (faseAtual * 200)) {
            gold += 100 + (faseAtual * 20)
            faseAtual++
            alert("Fase concluída!")
        } else {
            alert("Você perdeu!")
        }

        score = 0
        movimentos = 20
        salvar()
        atualizarUI()
        createBoard()
    }
}

function atualizarUI() {
    scoreDisplay.textContent = score
    goldDisplay.textContent = gold
}

setInterval(() => {
    checkMatches()
    dropCandies()
}, 200)

/* ===== LOJA VISUAL ===== */

function abrirLoja() {
    document.getElementById("loja").style.display = "block"
}

function fecharLoja() {
    document.getElementById("loja").style.display = "none"
}

function comprar(item) {

    if (item === "martelo" && gold >= 200) {
        gold -= 200
        martelo++
    }

    if (item === "bomba" && gold >= 300) {
        gold -= 300
        bomba++
    }

    if (item === "troca" && gold >= 150) {
        gold -= 150
        troca++
    }

    atualizarUI()
    salvar()
}

function usar(item) {
    if (item === "martelo" && martelo > 0) modoItem = "martelo"
    if (item === "bomba" && bomba > 0) modoItem = "bomba"
}

function openCode() {
    const code = prompt("Digite o código secreto:")
    if (code === "Pedro123") {
        gold = 999999
        martelo = 99
        bomba = 99
        troca = 99
        atualizarUI()
        alert("Modo Supremo ativado")
    }
}

createBoard()
atualizarUI()
