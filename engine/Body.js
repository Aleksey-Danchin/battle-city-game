import Sprite from './Sprite'
import Util from './Util'

export default class Body extends Sprite {
    constructor (texture, args = {}) {
        super(texture, args)

        const body = args.body || {}

        this.debug = args.debug || false

        this.static = args.static || false

        this.body = {}
        this.body.x = body.x || 0
        this.body.y = body.y || 0
        this.body.width = body.width || 1
        this.body.height = body.height || 1
    }

    get bodyRect () {
        return {
            x: this.absoluteX + this.width * this.scaleX * this.body.x,
            y: this.absoluteY + this.height * this.scaleY * this.body.y,
            width: this.width * this.scaleX * this.body.width,
            height: this.height * this.scaleY * this.body.height
        }
    }

    get tops () {
        const { x, y, width, height } = this.bodyRect

        return [
            [x, y],
            [x + width, y],
            [x, y + height],
            [x + width, y + height]
        ]
    }

    isInside (x, y) {
        return Util.isInside({ x, y }, this.bodyRect)
    }

    draw (canvas, context) {
        if (!this.visible) {
            return
        }

        context.save()
        context.translate(this.x, this.y)
        context.rotate(-this.rotation)

        // context.scale(this.scaleX, this.scaleY)

        context.drawImage(
            this.texture,
            this.frame.x,
            this.frame.y,
            this.frame.width,
            this.frame.height,
            this.absoluteX - this.x,
            this.absoluteY - this.y,
            this.width * this.scaleX,
            this.height * this.scaleY
        )
        
        if (this.debug) {
            const { x, y, width, height } = this.bodyRect

            context.fillStyle = 'rgba(255, 0, 0, 0.2)'
            context.beginPath()
            context.rect(x - this.x, y - this.y, width, height)
            context.fill()

            context.fillStyle = 'rgb(0, 255, 0)'
            context.beginPath()
            context.arc(0, 0, 3, 0, Math.PI * 2)
            context.fill()
        }

        context.restore()
    }
}