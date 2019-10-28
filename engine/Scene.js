import Container from './Container'

export default class Scene extends Container {
    constructor (args = {}) {
        super()

        this.autoStart = args.autoStart || false
        this.name = args.name || ''

        this.status = 'waiting'
        this.stage = this.displayObjects

        if (args.loading) {
            this.loading = args.loading.bind(this)
        }

        if (args.init) {
            this.init = args.init.bind(this)
        }

        if (args.update) {
            this.update = args.update.bind(this)
        }

        if (args.beforeDestroy) {
            this.beforeDestroy = args.beforeDestroy.bind(this)
        }
    }

    loading () {}
    init () {}
    update () {}
    beforeDestroy () {}
}