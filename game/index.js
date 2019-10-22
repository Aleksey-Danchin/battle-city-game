const DEBUG_MODE = false

const { Body, Game, Scene, ArcadePhysics, Util, Sprite } = GameEngine

const game = new Game({
    el: document.body,
    width: 650,
    height: 650,
    background: 'black',
    scenes: [
        new Intro({ autoStart: false }),
        new Party({ autoStart: true })
    ]
})