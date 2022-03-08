import { makeAutoObservable } from 'mobx';

class CanvasStore {
    //init state
    _canvas = null

    //autoobservable
    constructor() {
        makeAutoObservable(this)
    }

    //actions
    setCanvas(canvas) {
        this._canvas = canvas
    }

    //getters
    get canvas() {
        return this._canvas
    }
}

export default new CanvasStore()