import { Body, Util } from '../engine'

export default class Bullet extends Body {
    constructor (originalArgs = {}) {
        const args = Object.assign({
            scale: 2,
            anchorX: 0.5,
            anchorY: 0.5
        }, originalArgs)

        super(Bullet.texture, args)

        this.tank = null
        this.toDestroy = false

        this.setFramesCollection(Bullet.atlas.frames)
        this.setAnimationsCollection(Bullet.atlas.actions)

        this.on('collision', (a, b) => {
            if (a === this.tank) {
                return
            }

            if (a.isEnemy && blur.isEnemy) {
                return
            }
            
            this.toDestroy = true
        })
    }

    destroy () {
        Util.removeElements(this.tank.bullets, this)

        delete this.tank

        const scene = this.scene
        
        scene.arcadePhysics.remove(this)
        scene.remove(this)
    }
}

Bullet.texture = null
Bullet.atlas = null

Bullet.NORMAL_SPEED = 5