import Phaser from "phaser"

export const FuelGallon = new Phaser.Class({
  Extends: Phaser.GameObjects.Image,

  initialize: function FuelGallon(scene) {
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'fuelGallon')
    this.speed = Phaser.Math.GetSpeed(150, 1)
  },

  create: function () {
    let y = Math.random() * (280 - 40) + 40
    this.setPosition(790, y)
    this.setActive(true)
    this.setVisible(true)
  },

  update: function (time, delta) {
    this.x -= this.speed * delta
    if (this.x < 20) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
})