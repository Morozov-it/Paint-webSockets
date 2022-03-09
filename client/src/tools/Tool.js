
//родительский класс для каждого инструмента
export default class Tool {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.destroyEvents()
    }

    //setters это функции для изменения значений в контексте
    set fillColor(color) {
        this.ctx.fillStyle = color;
    }
    set strokeColor(color) {
        this.ctx.strokeStyle = color;
    }
    set lineWidth(width) {
        this.ctx.lineWidth = width;
    }

    //обнуление слушателей при смене инструментов рисования
    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}