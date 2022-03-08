import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas) {
        super(canvas)//вызывает конструктор родительского класса
        this.listen()
    }

    //добавление слушателей на canvas
    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    //обработчики слушателей событий мыши
    mouseUpHandler(e) {
        this.mouseDown = false
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        //начало рисования новой линии
        this.ctx.beginPath()
        //получение начальных координат курсора
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
    mouseMoveHandler(e) {
        //проверка нажатия левой кнопки мыши
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }

    //функция рисования
    draw(x, y) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
        console.log('Draw brush')
    }
}