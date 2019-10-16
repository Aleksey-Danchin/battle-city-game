;(function () {
    'use strict'

    class Container {
        constructor () {
            this.displayObjects = []
        }

        add (displayObject) {
            if (!this.displayObjects.includes(displayObject)) {
                this.displayObjects.push(displayObject)
            }
        }

        remove () {}

        draw (canvas, context) {
            for (const displayObject of this.displayObjects) {
                displayObject.draw(canvas, context)
            }
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Container = Container
})();