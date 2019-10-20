;(function () {
    'use strict'

    class EventEmitter {
        constructor () {
            this.handlers = {}
        }

        on (...args) {
            this.addEventListener(...args)
        }

        off (...args) {
            this.removeEventListener(...args)
        }

        addEventListener (name, handler) {
            if (!this.handlers.hasOwnProperty(name)) {
                this.handlers[name] = []
            }

            this.handlers[name].push(handler)
        }

        removeEventListener (name = null, handler = null) {}

        emit (name, ...args) {
            if (!this.handlers.hasOwnProperty(name)) {
                return
            }

            for (const handler of this.handlers[name]) {
                handler(...args)
            }
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.EventEmitter = EventEmitter
})();