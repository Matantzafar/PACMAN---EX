'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}


function onMovePacman(ev) {
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    if (nextCell === GHOST) {
        if (gPacman.isSuper) removeGhost(nextLocation)
        else {
            gameOver()
            return
        } 
    }

    if (nextCell === FOOD) {
        updateScore(1)
        checkVictory()
    }

    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        superMode()
    }

    if (nextCell === CHERRY) {
        updateScore(10)
        checkVictory()
    }
    
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)
    
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    
    renderCell(nextLocation, PACMAN)
}

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    renderCell(nextLocation, PACMAN)

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}