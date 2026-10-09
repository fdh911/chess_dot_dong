const htmlSquareMap = new Map()
const boardPieceMap = new Map()

let selectedSquare = null

setup()

function setup() {
    const allSquares = document.querySelectorAll('.square')

    if(allSquares.length !== 64) {
        console.error('Could not get all 64 board squares')
        return
    }

    let i = 0

    for(let row of '87654321') {
        for(let col of 'abcdefgh') {
            let pos = col + row
            let sq = allSquares[i]
            htmlSquareMap.set(pos, sq)
            htmlSquareMap.set(sq, pos)
            i++
        }
    }


    for(let s of allSquares) {
        s.addEventListener('click', htmlSq => {
            let target  = htmlSq.target

            if(target.className != 'board-inner square')
                target = target.parentNode

            clickedSquare = htmlSquareMap.get(target)

            if(selectedSquare != null) {
                makeMove(selectedSquare, clickedSquare)
                selectedSquare = null
            }
            else {
                selectedSquare = clickedSquare
            }

            console.log(`Selected ${selectedSquare}`)
        })
    }

    setFromFenString('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
}

function makeMove(posFrom, posTo) {
    const piece = boardPieceMap.get(posFrom)
    if(piece == null) return
    removePiece(posFrom)
    addPiece(posTo, piece)
}

// (1-8, 1-8)
function posNrToStr(rowNr, colNr) {
    return String.fromCharCode(96 + colNr) + String.fromCharCode(48 + rowNr)
}

function setFromFenString(fenString) {
    rowNr = 8
    colNr = 1

    for(let c of fenString) {
        if(c == '/') {
            rowNr--
            colNr = 1
            continue;
        }
        
        if('12345678'.includes(c)) {
            colNr += Number(c)
            continue;
        }

        pos = posNrToStr(rowNr, colNr)

        let piecePrefix

        if('pnbrqk'.includes(c)) {
            piecePrefix = 'B'
        }
        else if('PNBRQK'.includes(c)) {
            piecePrefix = 'W'
        }
        else {
            throw new Exception('larp larp sahur ahh fen string (try again)')
        }

        addPiece(pos, piecePrefix + c)
        colNr++
    }
}

function addPiece(square, pieceName) {
    if(boardPieceMap.has(square))
        return
    const htmlSquare = htmlSquareMap.get(square)
    const image = document.createElement('img')
    image.setAttribute('src', `pieces/${pieceName}.png`)
    image.className = 'piece'
    htmlSquare.appendChild(image)
    boardPieceMap.set(square, pieceName)
}

function removePiece(square) {
    if(! boardPieceMap.has(square))
        return
    const htmlSquare = htmlSquareMap.get(square)
    htmlSquare.removeChild(htmlSquare.lastChild)
    boardPieceMap.delete(square)
}