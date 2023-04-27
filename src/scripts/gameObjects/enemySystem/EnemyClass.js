import Phaser from "phaser"
import { gameover } from "../../scenes/Amazon"

export const Enemy = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize: function Enemy(scene) {
    Phaser.GameObjects.Sprite.call(this, scene, 0, 0, 'enemy')
    this.speed = Phaser.Math.GetSpeed(90, 1)
  },

  create: function () {
    let y = Math.random() * (580 - 40) + 40
    this.setPosition(790, y)
    this.setActive(true)
    this.setVisible(true)
    this.play('enemyFly')
  },

  update: function (time, delta) {
    this.x -= this.speed * delta
    if (this.x < 20) {
      this.setActive(false)
      this.setVisible(false)
      gameover()
    }
  }
})
