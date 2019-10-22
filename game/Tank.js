class Tank extends GameEngine.Body {
    constructor (originalArgs = {}) {
        const args = Object.assign({
            scale: 3.5,
            keysDefault: ['yellow', 'type1'],
            debug: DEBUG_MODE
        }, originalArgs)

        super(Tank.texture, args)

        this.bullets = []

        this.setFramesCollection(Tank.atlas.frames)
        this.setAnimationsCollection(Tank.atlas.actions)
        this.startAnimation('moveUp')

        this.on('collision', (a, b) => this.collisionHandler(a, b))
    }

    collisionHandler (a, b) {
        if (a instanceof Bullet) {
            if (this.bullets.includes(a)) {
                return
            }

            else {
                this.scene.arcadePhysics.remove(this)
                this.scene.remove(this)
            }
        }

        this.velocity.x = 0
        this.velocity.y = 0
    }

    fire () {
        const bullet = new Bullet({
            debug: DEBUG_MODE,
            x: this.centerX,
            y: this.centerY
        })

        this.bullets.push(bullet)
        bullet.tank = this

        if (this.animation === 'moveUp') {
            bullet.velocity.y = -Bullet.NORMAL_SPEED
            bullet.setFrameByKeys('bullet', 'up')
        }

        else if (this.animation === 'moveLeft') {
            bullet.velocity.x = -Bullet.NORMAL_SPEED
            bullet.setFrameByKeys('bullet', 'left')
        }

        else if (this.animation === 'moveRight') {
            bullet.velocity.x = Bullet.NORMAL_SPEED
            bullet.setFrameByKeys('bullet', 'right')
        }

        else if (this.animation === 'moveDown') {
            bullet.velocity.y = Bullet.NORMAL_SPEED
            bullet.setFrameByKeys('bullet', 'down')
        }

        this.scene.add(bullet)
        this.scene.arcadePhysics.add(bullet)

        return bullet
    }

    movementUpdate (keyboard) {
        const sd = x => this.setDirect(x, keyboard.space)

        if (keyboard.arrowUp) {
            sd('up')
        }

        else if (keyboard.arrowLeft) {
            sd('left')
        }

        else if (keyboard.arrowRight) {
            sd('right')
        }

        else if (keyboard.arrowDown) {
            sd('down')
        }

        else {
            sd(null)
        }
    }

    setDirect (direct, fireCommand) {
        this.velocity.x = 0
        this.velocity.y = 0

        if (this.animationPaused) {
            this.resumeAnimation()
        }

        if (direct === 'left') {
            this.velocity.x = -Tank.NORMAL_SPEED

            if (this.animation !== 'moveLeft') {
                this.startAnimation('moveLeft')
            }
        }
        
        else if (direct === 'right') {
            this.velocity.x = Tank.NORMAL_SPEED

            if (this.animation !== 'moveRight') {
                this.startAnimation('moveRight')
            }
        }
        
        else if (direct === 'down') {
            this.velocity.y = Tank.NORMAL_SPEED

            if (this.animation !== 'moveDown') {
                this.startAnimation('moveDown')
            }
        }
        
        else if (direct === 'up') {
            this.velocity.y = -Tank.NORMAL_SPEED

            if (this.animation !== 'moveUp') {
                this.startAnimation('moveUp')
            }
        }

        else {
            this.pauseAnimation()
        }

        if (fireCommand && Util.delay('tank' + this.uid, Tank.BULLET_TIMEOUT)) {
            this.fire()
        }
    }
}

Tank.texture = null
Tank.atlas = null

Tank.NORMAL_SPEED = 2
Tank.BULLET_TIMEOUT = 1000