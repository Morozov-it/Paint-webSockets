import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas) {
        super(canvas)//вызывает конструктор родительского класса
    }

    //функция рисования
    draw(x, y) {
        this.ctx.strokeStyle = "white"
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}