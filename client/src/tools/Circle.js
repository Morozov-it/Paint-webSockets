import Tool from "./Tool";

export default class Circle extends Tool {
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
        //сохранение данных позиции в canvas
        let canvasData = this.canvas.toDataURL();
        //начало рисования новой линии
        this.ctx.beginPath()
        //запись стартовой позиции курсора
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = canvasData
    }
    mouseUpHandler(e) {
        this.mouseDown = false
    }
    mouseMoveHandler(e) {
        //проверка нажатия левой кнопки мыши
        if (this.mouseDown) {
            //получение текущей позиции курсора
            let currentX = e.pageX - e.target.offsetLeft
            let currentY = e.pageY - e.target.offsetTop
            let width = currentX - this.startX
            let height = currentY - this.startY
            let radius = Math.sqrt(width**2 + height**2)
            //вызов функции рисования с полученными координатами
            this.draw(this.startX, this.startY, radius)
        }
    }

    //функция рисования прямоугольника
    draw(x, y, radius) {
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
            this.ctx.arc(x, y, radius, 0, 2 * Math.PI)//координаты фигуры
            this.ctx.fill() //заполнение фигуры
            this.ctx.stroke() //контур фигуры
        }
    }
}