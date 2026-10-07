setup()

function setup() {
    const c = document.getElementById("board")
    const ctx = c.getContext("2d")

    c.addEventListener('click', ev => {
        console.log('clicked on ' + detClickedSquare(c.clientWidth, c.clientHeight, ev.offsetX, ev.offsetY))
    })

    ctx.fillRect(0, 0, c.clientWidth, c.clientHeight)
}

function detClickedSquare(w, h, cx, cy) {
    cy = h - cy
    row = 65 + Math.min(Math.floor((cx / w) * 8), 7)
    col = 48 + Math.min(Math.floor((cy / h) * 8), 7) + 1
    return String.fromCharCode(row, col)
}