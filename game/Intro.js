class Intro extends GameEngine.Scene {
    constructor (args = {}) {
        super({
            name: 'intoScene',
            ...args
        })
    }

    loading (loader) {
        loader.addImage('intro', 'static/intro.png')
        loader.addSound('intro', 'static/sound/stage_start.ogg')
    }

    init () {
        const { loader } = this.parent
        
        this.image = new Sprite(loader.getImage('intro'), {
            x: 0,
            y: this.parent.renderer.canvas.height,
            width: this.parent.renderer.canvas.width,
            height: this.parent.renderer.canvas.height
        })
        
        this.add(this.image)

        this.imageTweenStopper = Util.tween({
            target: this.image,
            duration: 3500,
            processer (target, percent, context) {
                if (percent === 0) {
                    loader.getSound('intro').play()
                    context.y = target.y
                }

                target.y = context.y * (1 - percent)
            }
        })
    }

    update (timestamp) {
        const { keyboard } = this.parent

        if (keyboard.space && Util.delay('introSpace', 1500)) {
            if (this.imageTweenStopper && this.image.y !== 0) {
                this.imageTweenStopper()
                delete this.imageTweenStopper
                this.image.y = 0
            }
    
            else {
                this.parent.startScene('party')
                this.parent.finishScene(this)
            }
        }
    }
}