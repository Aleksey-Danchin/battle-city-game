export default class Loader {
    constructor () {
        this.loadOrder = {
            images: [],
            jsons: [],
            sounds: []
        }

        this.resources = {
            images: {},
            jsons: {},
            sounds: {}
        }
    }

    addImage (name, src) {
        this.loadOrder.images.push({ name, src })
    }

    addJson (name, address) {
        this.loadOrder.jsons.push({ name, address })
    }

    addSound (name, src) {
        this.loadOrder.sounds.push({ name, src })
    }

    getImage (name) {
        return this.resources.images[name]
    }
    
    getJson (name) {
        return this.resources.jsons[name]
    }

    getSound (name) {
        return this.resources.sounds[name]
    }

    load (callback) {
        const promises = []

        for (const imageData of this.loadOrder.images) {
            const { name, src } = imageData

            const promise = Loader
                .loadImage(src)
                .then(image => {
                    this.resources.images[name] = image
                    
                    if (this.loadOrder.images.includes(imageData)) {
                        const index = this.loadOrder.images.indexOf(imageData)
                        this.loadOrder.images.splice(index, 1)
                    }
                })

            promises.push(promise)
        }

        for (const jsonData of this.loadOrder.jsons) {
            const { name, address } = jsonData

            const promise = Loader
                .loadJson(address)
                .then(json => {
                    this.resources.jsons[name] = json
                    
                    if (this.loadOrder.jsons.includes(jsonData)) {
                        const index = this.loadOrder.jsons.indexOf(jsonData)
                        this.loadOrder.jsons.splice(index, 1)
                    }
                })

            promises.push(promise)
        }

        for (const soundData of this.loadOrder.sounds) {
            const { name, src } = soundData

            const promise = Loader
                .loadSound(src)
                .then(audio => {
                    this.resources.sounds[name] = audio
                    
                    if (this.loadOrder.sounds.includes(soundData)) {
                        const index = this.loadOrder.sounds.indexOf(soundData)
                        this.loadOrder.sounds.splice(index, 1)
                    }
                })

            promises.push(promise)
        }

        Promise.all(promises).then(callback)
    }

    static loadImage (src) {
        return new Promise((resolve, reject) => {
            try {
                const image = new Image
                image.onload = () => resolve(image)
                image.src = src
            }

            catch (err) {
                reject(err)
            }
        })
    }

    static loadJson (address) {
        return new Promise((resolve, reject) => {
            fetch(address)
                .then(result => result.json())
                .then(result => resolve(result))
                .catch(err => reject(err))
        })
    }

    static loadSound (src) {
        return new Promise((resolve, reject) => {
            try {
                const audio = new Audio
                audio.addEventListener('canplaythrough', () => resolve(audio))
                audio.src = src
            }

            catch (error) {
                reject(error)
            }
        })
    }
}