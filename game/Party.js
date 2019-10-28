import { Scene, ArcadePhysics, Body, Util } from '../engine'

import Topology from './Topology'
import Tank from './Tank'
import Bullet from './Bullet'
import EnemyTank from './EnemyTank'

export default class Party extends Scene {
    constructor (args = {}) {
        super({
            name: 'party',
            ...args
        })
        
        this.enemies = new Set
    }
    
    loading (loader) {
        loader.addImage('spriteSheet', 'static/Battle City Sprites.png')
        loader.addJson('atlas', 'static/atlas.json')
        loader.addJson('map', 'static/map1.json')
        loader.addJson('party', 'static/party.json')
    }
    
    init () {
        const { loader, renderer: { canvas: { width, height } } } = this.parent
        
        Bullet.texture = Topology.texture = Tank.texture = loader.getImage('spriteSheet')
        Bullet.atlas = Topology.atlas = Tank.atlas = loader.getJson('atlas')

        this.partyData = loader.getJson('party')
        
        this.arcadePhysics = new ArcadePhysics

        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: width + 20,
            height: 9
        }))

        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: -10,
            y: -10,
            width: 9,
            height: height + 20
        }))

        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: height,
            y: -10,
            width: 9,
            height: height + 20
        }))

        this.arcadePhysics.add(new Body(null, {
            static: true,
            x: -10,
            y: width,
            width: width + 20,
            height: 9
        }))

        this.topology = new Topology(loader.getJson('map'))
        this.add(this.topology)
        this.arcadePhysics.add(...this.topology.displayObjects)

        const [x, y] = this.topology.getCoordinats('tank1', true)
        this.mainTank = new Tank({
            x: x * this.topology.size,
            y: y * this.topology.size
        })
        this.add(this.mainTank)
        this.arcadePhysics.add(this.mainTank)

        if (this.topology.eagle) {
            this.topology.eagle.on('collision', a => {
                if (a instanceof Bullet) {
                    this.game.startScene('resultScene')
                    this.game.finishScene(this)
                }
            })
        }
    }

    update () {
        const { keyboard } = this.parent
        
        this.mainTank.movementUpdate(keyboard)
        
        for (const enemyTank of this.enemies) {
            if (!this.displayObjects.includes(enemyTank)) {
                this.enemies.delete(enemyTank)
                continue
            }

            if (enemyTank.nextDirect) {
                enemyTank.setDirect(enemyTank.nextDirect)
                enemyTank.nextDirect = null
            }

            if (Util.delay(enemyTank.uid + 'fired', Tank.BULLET_TIMEOUT)) {
                const bullet = enemyTank.fire()
                bullet.isEnemy = true
            }
        }

        this.arcadePhysics.processing()

        if (
            this.enemies.size < this.partyData.enemy.simultaneously
            && Util.delay(this.uid + 'enemyGeneration', this.partyData.enemy.spawnDelay)
        ) {
            const [x, y] = Util.getRandomFrom(...this.topology.getCoordinats('enemy'))

            const enemyTank = new EnemyTank({
                x: x * this.topology.size,
                y: y * this.topology.size
            })

            enemyTank.isEnemy = true

            this.enemies.add(enemyTank)
            this.add(enemyTank)
            this.arcadePhysics.add(enemyTank)

            enemyTank.setDirect('down')
        }
        
        for (const enemyTank of this.enemies) {
        }

        for (const object of this.arcadePhysics.objects) {
            if (object instanceof Bullet && object.toDestroy) {
                object.destroy()
            }
        }
    }
}