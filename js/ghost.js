'use strict'

const GHOST = '👻'
var gGhosts = []
var gRemovedGhosts= []

var gIntervalGhosts

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    
    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    for (let i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return

    if (nextCell === PACMAN) {
        if (gPacman.isSuper) return 
        gameOver()
        return
    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    renderCell(ghost.location,  ghost.currCellContent)


    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    renderCell(ghost.location, getGhostHTML(ghost))
}

function removeGhost(loc) {
    for ( var i = 0 ; i<gGhosts.length; i++) {
        if (gGhosts[i].location.i === loc.i && gGhosts[i].location.j === loc.j) {
            gRemovedGhosts.push(gGhosts[i])
            gGhosts.splice(i, 1)
        }
    }
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span data-i:${ghost.location.i} data-j:${ghost.location.j} style="background-color: ${ghost.color};">${GHOST}</span>`
}
