import { makeAutoObservable } from 'mobx';

class ToolStore {
    //init state
    _tool = null

    //autoobservable
    constructor() {
        makeAutoObservable(this)
    }

    //actions
    setTool(tool) {
        this._tool = tool
    }

    //getters
    get tool() {
        return this._tool
    }
}

export default new ToolStore();