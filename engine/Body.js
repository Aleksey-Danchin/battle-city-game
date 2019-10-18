;(function () {
    'use strict'

    class Body extends GameEngine.Sprite {
        constructor (texture, args = {}) {
            super(texture, args)

            const body = args.body || {}

            this.debug = args.debug || false

            this.body = {}
            this.body.x = body.x || 0
            this.body.y = body.y || 0
            this.body.width = body.width || 1
            this.body.height = body.height || 1
        }

        draw (canvas, context) {
            if (!this.visible) {
                return
            }

            context.save()
            context.translate(this.x, this.y)
            context.rotate(-this.rotation)

            context.scale(this.scaleX, this.scaleY)

            context.drawImage(
                this.texture,
                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,
                this.absoluteX - this.x,
                this.absoluteY - this.y,
                this.width,
                this.height
            )
            
            if (this.debug) {
                context.fillStyle = 'rgba(255, 0, 0, 0.3)'
                context.beginPath()
                context.rect(
                    this.absoluteX - this.x + this.body.x * this.width,
                    this.absoluteY - this.y + this.body.y * this.height,
                    this.width * this.body.width,
                    this.height * this.body.height
                )
                context.fill()
            }

            context.restore()
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Body = Body
})();