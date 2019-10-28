import EventEmitter from './EventEmitter'
import Util from './Util'

export default class DisplayObject extends EventEmitter {
    constructor (args = {}) {
        super()

        this.uid = Util.generateUid()

        this.x = args.x || 0
        this.y = args.y || 0

        this.width = args.width || 0
        this.height = args.height || 0

        this.rotation = args.rotation || 0

        this.anchorX = args.anchorX || 0
        this.anchorY = args.anchorY || 0

        this.scaleX = args.scaleX || 1
        this.scaleY = args.scaleY || 1

        this.parent = null
        this.visible = true

        if (args.scale !== undefined) {
            this.setScale(args.scale)
        }
    }

    get scene () {
        return Util.getScene(this)
    }

    get game () {
        return this.scene.parent
    }

    get absoluteX () {
        return this.x - this.anchorX * this.width * this.scaleX
    }

    set absoluteX (value) {
        this.x = value + this.anchorX * this.width * this.scaleX
        return value
    }
    
    get absoluteY () {
        return this.y - this.anchorY * this.height * this.scaleY
    }
    
    set absoluteY (value) {
        this.y = value + this.anchorY * this.height * this.scaleY
        return value
    }

    get centerX () {
        return this.absoluteX + this.width / 2 * this.scaleX
    }

    set centerX (value) {
        return this.absoluteX = value - this.width / 2
    }

    get centerY () {
        return this.absoluteY + this.height / 2 * this.scaleY
    }

    set centerY (value) {
        return this.absoluteY = value - this.height / 2
    }

    setScale (scale) {
        this.scaleX = scale
        this.scaleY = scale
    }

    setParent (parent) {
        if (this.parent && this.parent.remove) {
            this.parent.remove(this)
        }

        if (parent && parent.add) {
            parent.add(this)
        }
        
        this.parent = parent
    }

    draw (callback) {
        if (this.visible) {
            callback()
        }
    }
}