class Bullet extends GameEngine.Body {
    constructor (originalArgs = {}) {
        const args = Object.assign({
            anchorX: 0.5,
            anchorY: 0.5
        }, originalArgs)

        super(Bullet.texture, args)

        this.tank = null
        this.toDestroy = false

        this.setFramesCollection(Bullet.atlas.frames)
        this.setAnimationsCollection(Bullet.atlas.actions)

        this.on('collision', (a, b) => {
            if (b === this.tank) {
                return
            }
            
            this.toDestroy = true
        })
    }

    destroy () {
        Util.removeElements(this.tank.bullets, this)

        delete this.tank

        const scene = Util.getScene(this)
        scene.remove(this)
        scene.arcadePhysics.remove(this)
    }
}

Bullet.texture = null
Bullet.atlas = null

Bullet.NORMAL_SPEED = 5