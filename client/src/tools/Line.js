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
    mouseUpHandler(e) {
        this.mouseDown = false
    }
    mouseDownHandler(e) {
        this.mouseDown = true
        //начало рисования новой линии
        this.ctx.beginPath()
        //запись стартовой позиции курсора
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        //сохранение данных позиции в canvas
        this.saved = this.canvas.toDataURL();
    }
    mouseMoveHandler(e) {
        //проверка нажатия левой кнопки мыши
        if (this.mouseDown) {
            //получение текущей позиции курсора
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            //вызов функции рисования с полученными координатами
            this.draw(currentX, currentY)
        }
    }

    //функция рисования прямоугольника
    draw(x, y) {
        //создание нового html <img> объекта
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            //очищение всего холста
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            //нанесение на холст сохраненного изображения
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

            //рисование новой фигуры
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY) //начальная точка
            this.ctx.lineTo(x,y) //текущая точка
            this.ctx.stroke() //контур фигуры
        }
    }
}