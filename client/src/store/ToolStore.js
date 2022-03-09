import { makeAutoObservable } from 'mobx';

class ToolStore {
    //init state
    _tool = null
    _active = 'brush'
    _color = '#000'

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
    setColor(color) {
        this._color = color
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