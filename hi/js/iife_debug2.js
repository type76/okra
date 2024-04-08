function testingTextureCanvas(w=512,h=256) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    const xSegs = 25;
    const ySegs = 13;
    const cellW = w / xSegs;
    const cellH = h / ySegs;

    let fontSize = 38;
    if(fontSize > cellH) fontSize = Math.floor(cellH * 0.4);
    ctx.font = `${fontSize}px sans-serif`;
    for (let x = 0; x < xSegs; x++) {
        for (let y = 0; y < ySegs; y++) {
            const label = `${x}:${y}`;
            const mez = ctx.measureText(label);
            ctx.fillStyle = (x + y) % 2 ? 'black' : 'white';
            ctx.fillRect(x * cellW, y * cellH, cellW, cellH);
            ctx.fillStyle = (x + y) % 2 ? 'white' : 'black';
            let _x = x * cellW + (cellW/2);
            let _y = y * cellH + (cellH/2);
            _x -= mez.width / 2;
            _y += fontSize / 2;
            ctx.fillText(label, _x, _y);
        }
    }
    return canvas;
}
