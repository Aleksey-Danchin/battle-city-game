;(function () {
    'use strict'

    class ArcadePhysics {
        constructor () {
            this.objects = new Set
        }

        add (...objects) {
            for (const object of objects) {
                this.objects.add(object)
            }
        }

        remove (...objects) {
            for (const object of objects) {
                this.objects.delete(object)
            }
        }

        processing () {
            const objects = Array.from(this.objects)

            for (let i = 0; i < objects.length - 1; i++) {
                const a = objects[i]
                const bodyA = a.bodyRect
                const topsA = a.tops
                const vxA = a.velocity.x
                const vyA = a.velocity.y
                
                for (let j = i + 1; j < objects.length; j++) {
                    const b = objects[j]

                    if (a.static && b.static) {
                        continue
                    }

                    const bodyB = b.bodyRect
                    const topsB = b.tops
                    const vxB = b.velocity.x
                    const vyB = b.velocity.y

                    let crossing = false

                    for (const topA of topsA) {
                        crossing = GameEngine.Util.isInside(
                            {
                                x: topA[0] + vxA,
                                y: topA[1] + vyA
                            },
                            {
                                x: bodyB.x + vxB,
                                y: bodyB.y + vyB,
                                width: bodyB.width,
                                height: bodyB.height
                            }
                        )

                        if (crossing) {
                            break
                        }
                    }

                    if (crossing === false) {
                        for (const topB of topsB) {
                            crossing = GameEngine.Util.isInside(
                                {
                                    x: topB[0] + vxB,
                                    y: topB[1] + vyB
                                },
                                {
                                    x: bodyA.x + vxA,
                                    y: bodyA.y + vyA,
                                    width: bodyA.width,
                                    height: bodyA.height
                                }
                            )
    
                            if (crossing) {
                                break
                            }
                        }
                    }

                    if (crossing) {
                        a.emit('collision', b, a)
                        b.emit('collision', a, b)
                    }
                }
            }
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.ArcadePhysics = ArcadePhysics

})();