import { Body, Game, Scene, ArcadePhysics, Util, Sprite } from '../engine'
import Intro from './Intro'
import Party from './Party'

export default new Game({
    el: document.body,
    width: 650,
    height: 650,
    background: 'black',
    scenes: [
        new Intro({ autoStart: false }),
        new Party({ autoStart: true })
    ]
})