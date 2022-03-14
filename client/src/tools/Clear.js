
export default class Clear {
    constructor(canvas, socket, id) {
        this.canvas = canvas
        this.socket = socket
        this.id = id
        this.clear()
    }

    clear() {
        //отправка запроса серверу на очищение всего холста
        this.socket.send(JSON.stringify({
        id: this.id,
        method: 'draw',
        figure: {
            type: 'clear',
            width: this.canvas.width,
            height: this.canvas.height,
        }
    }))}
}


