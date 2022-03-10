import { makeAutoObservable } from 'mobx';

class CanvasStore {
    //init state
    _canvas = null
    _undolist = []
    _redolist = []
    _username = ''

    //autoobservable
    constructor() {
        makeAutoObservable(this)
    }

    //actions
    setCanvas(canvas) {
        this._canvas = canvas
    }
    setUsername(name) {
        this._username = name
    }
    pushToUndo(data) {
        this._undolist.push(data)
    }
    pushToRedo(data) {
        this._redolist.push(data)
    }

    get canvas() {
        return this._canvas
    }
    get username() {
        return this._username
    }

    //отмена действия
    undo() {
        //получение контекста холста
        let ctx = this._canvas.getContext('2d')
        if (this._undolist.length > 0) {
            //получение последнего элемента из массива состояния
            let dataUrl = this._undolist.pop()

            //сохранение последнего действия в массив redo
            this.pushToRedo(this._canvas.toDataURL())

            //создание нового объекта рисунка и оптравка в него состояния холста
            let img = new Image()
            img.src = dataUrl

            //метод сработает когда установится изображение
            img.onload = () => {
                //очистка холста
                ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
                //обновление холста
                ctx.drawImage(img, 0, 0, this._canvas.width, this._canvas.height)
            }
        } else return;
    }

    //возврат отмены действия
    redo() {
        //получение контекста холста
        let ctx = this._canvas.getContext('2d')
        if (this._redolist.length > 0) {
            //получение последнего элемента из массива состояния
            let dataUrl = this._redolist.pop()

            //сохранение последнего действия в массив undo
            this.pushToUndo(this._canvas.toDataURL())

            //создание нового объекта рисунка и оптравка в него состояния холста
            let img = new Image()
            img.src = dataUrl

            //метод сработает когда установится изображение
            img.onload = () => {
                //очистка холста
                ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
                //обновление холста
                ctx.drawImage(img, 0, 0, this._canvas.width, this._canvas.height)
            }
        } else return;
    }
}

export default new CanvasStore()