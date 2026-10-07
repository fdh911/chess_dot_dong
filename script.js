const squaresMap = new Map()

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
            squaresMap.set(pos, sq)
            squaresMap.set(sq, pos)
            i++
        }
    }

    for(let s of allSquares) {
        s.addEventListener('click', sq => {
            console.log(`${squaresMap.get(sq.target)} got lowkey clicked`)
        })
    }
}
