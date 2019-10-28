import DisplayObject from './DisplayObject'

export default class Container extends DisplayObject {
    constructor (args = {}) {
        super(args)

        this.displayObjects = []
    }

    add (...displayObjects) {
        for (const displayObject of displayObjects) {
            if (!this.displayObjects.includes(displayObject)) {
                this.displayObjects.push(displayObject)
                displayObject.setParent(this)
            }
        }
    }

    tick (timestamp) {
        for (const displayObject of this.displayObjects) {
            if (displayObject.tick) {
                displayObject.tick(timestamp)
            }
        }
    }

    remove (...displayObjects) {
        for (const displayObject of displayObjects) {
            if (this.displayObjects.includes(displayObject)) {
                const index = this.displayObjects.indexOf(displayObject)
                this.displayObjects.splice(index, 1)
                displayObject.setParent(null)
            }
        }
    }

    draw (canvas, context) {
        super.draw(() => {
            context.save()
            context.translate(this.x, this.y)
            context.rotate(-this.rotation)
            context.scale(this.scaleX, this.scaleY)

            for (const displayObject of this.displayObjects) {
                displayObject.draw(canvas, context)
            }

            context.restore()
        })
    }
}