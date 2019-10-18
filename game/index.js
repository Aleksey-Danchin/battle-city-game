const { Body, Game, Scene, Point, Line, Container } = GameEngine

const mainScene = new Scene({
    name: 'mainScene',
    autoStart: true,

    loading (loader) {
        loader.addImage('bunny', 'static/bunny.jpeg')
        loader.addJson('persons', 'static/persons.json')
    },

    init () {
        const bunnyTexture = this.parent.loader.getImage('bunny')

        this.bunny = new Body(bunnyTexture, {
            scale: 0.25,
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.parent.renderer.canvas.width / 2,
            y: this.parent.renderer.canvas.height / 2,
            debug: true,
            body: {
                x: 0,
                y: 0.5,
                width: 1,
                height: 0.5
            }
        })

        this.add(this.bunny)
    },

    update (timestamp) {
        const { keyboard } = this.parent

        let speedRotation = keyboard.space ? Math.PI / 100 : Math.PI / 200

        if (keyboard.arrowUp) {
            this.bunny.rotation += speedRotation
        }

        if (keyboard.arrowDown) {
            this.bunny.rotation -= speedRotation
        }
    }
})

const game = new Game({
    el: document.body,
    width: 500,
    height: 500,
    background: 'green',
    scenes: [mainScene]
})