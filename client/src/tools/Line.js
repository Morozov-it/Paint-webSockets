import Tool from "./Tool";

export default class Line extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id)//вызывает конструктор родительского класса
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
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        //начало рисования новой линии
        this.ctx.beginPath()
        this.ctx.moveTo(this.startX, this.startY)
        //сохранение данных позиции в canvas
        this.saved = this.canvas.toDataURL();
    }
    mouseMoveHandler(e) {
        //проверка нажатия левой кнопки мыши
        if (this.mouseDown) {
            this.currentX = e.pageX - e.target.offsetLeft
            this.currentY = e.pageY-e.target.offsetTop
            //вызов функции рисования с текущими координатами
            this.draw(this.currentX, this.currentY)
        }
    }
    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            id: this.id,
            method: 'draw',
            figure: {
                type: 'line',
                x: this.startX,
                y: this.startY,
                currentX: this.currentX,
                currentY: this.currentY,
                fillStyle: this.ctx.fillStyle,
                strokeStyle: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth
            }
        }))

        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish'
            }
        }))
    }
    

    //функция рисования прямой
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

    //функция рисования прямой через ws
    static staticDraw(ctx, x, y, currentX, currentY, fillStyle, strokeStyle, lineWidth) {
        //рисование новой фигуры
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.beginPath()
        ctx.moveTo(x, y) //начальная точка
        ctx.lineTo(currentX, currentY) //текущая точка
        ctx.stroke() //контур фигуры
    }
}