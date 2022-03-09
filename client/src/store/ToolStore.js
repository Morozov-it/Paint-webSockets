import { makeAutoObservable } from 'mobx';

class ToolStore {
    //init state
    _tool = null
    _active = 'brush'

    //autoobservable
    constructor() {
        makeAutoObservable(this)
    }

    //actions
    setTool(tool) {
        this._tool = tool
    }
    setActive(tool) {
        this._active = tool
    }
    setFillColor(color) {
        this._tool.fillColor = color;
    }
    setStrokeColor(color) {
        this._tool.strokeColor = color;
    }
    setLineWidth(width) {
        this._tool.lineWidth = width;
    }

    //getters
    get tool() {
        return this._tool
    }
    get active() {
        return this._active
    }
    get color() {
        return this._color
    }
}

export default new ToolStore();