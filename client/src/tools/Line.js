import Tool from "./Tool";

export default class Line extends Tool {
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
    mouseDownHandler(e) {
        this.mouseDown = true
        //запись стартовой позиции курсора
        this.currentX = e.pageX - e.target.offsetLeft;
        this.currentY = e.pageY - e.target.offsetTop;
        //начало рисования новой линии
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY)
        //сохранение данных позиции в canvas
        this.saved = this.canvas.toDataURL();
    }
    mouseUpHandler(e) {
        this.mouseDown = false
    }
    mouseMoveHandler(e) {
        //проверка нажатия левой кнопки мыши
        if (this.mouseDown) {
            //вызов функции рисования с текущими координатами
            this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop)
        }
    }

    //функция рисования прямоугольника
    draw(x, y) {
        //создание нового html <img> объекта
        const img = new Image();
        img.src = this.saved;
        img.onload = async function (){
            //очищение всего холста
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            //нанесение на холст сохраненного изображения
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

            //рисование новой фигуры
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY) //начальная точка
            this.ctx.lineTo(x,y) //текущая точка
            this.ctx.stroke() //контур фигуры
        }.bind(this)
    }
}