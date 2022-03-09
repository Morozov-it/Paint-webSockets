import ToolStore from "../store/ToolStore"

export default class Tool {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ctx.fillStyle = ToolStore.color;
        this.ctx.strokeStyle = ToolStore.color;
        this.ctx.lineWidth = 1;
        this.destroyEvents()
    }

    //обнуление слушателей при смене инструментов рисования
    destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}