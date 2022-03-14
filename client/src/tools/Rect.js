import Tool from "./Tool";

export default class Rect extends Tool {
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
        //начало рисования
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
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            //вызов функции рисования с полученными координатами
            this.draw(this.startX, this.startY, this.width, this.height)
        }
    }
    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            id: this.id,
            method: 'draw',
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
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

    //функция рисования прямоугольника в одном клиенте
    draw(x, y, w, h) {
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
            this.ctx.rect(x, y, w, h) //координаты фигуры
            this.ctx.fill() //заполнение фигуры
            this.ctx.stroke() //контур фигуры
        }
    }

    //функция рисования прямоугольника через ws
    static staticDraw(ctx, x, y, w, h, fillStyle, strokeStyle, lineWidth) {
        //рисование новой фигуры
        ctx.fillStyle = fillStyle;
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.rect(x, y, w, h) //координаты фигуры
        ctx.fill() //заполнение фигуры
        ctx.stroke() //контур фигуры
    }
}