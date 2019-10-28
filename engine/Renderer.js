export default class Renderer {
    constructor (args = {}) {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        
        this.background = args.background || 'black'
        this.canvas.width = args.width || 50
        this.canvas.height = args.height || 50
    }

    clear () {
        this.context.fillStyle = this.background
        this.context.beginPath()
        this.context.rect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fill()
    }
}