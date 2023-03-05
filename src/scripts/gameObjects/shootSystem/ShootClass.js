import Phaser from "phaser"

export const Shoot = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function Shoot(scene) {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'shoot')
    this.speed = Phaser.Math.GetSpeed(350, 1)
  },

  fire: function (x, y) {
    this.setPosition(x + 42, y + 5)
    this.setActive(true)
    this.setVisible(true)
  },

  update: function (time, delta) {
    this.x += this.speed * delta
    if (this.x > 800) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
})