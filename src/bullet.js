var Vector = require("../lib/vector")
var Event = require("../lib/event")
var canvas
var ctx

function Bullet(x, y, vx, vy) {
    this.vector = new Vector(x, y, vx, vy)
    this.vector.vx = 10
}

var BulletMethods = {
    move: function() {
        this.vector.update()
        this.draw()
    },
    draw: function() {
        ctx.save()
        ctx.translate(this.vector.x, this.vector.y)
        ctx.beginPath()
        ctx.arc(0, 0, 10, 2 * Math.PI, false)
        ctx.fillStyle = "#000"
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }
}

Bullet = Event.extend(Bullet, BulletMethods)
Bullet.init = function(cvs) {
    canvas = cvs
    ctx = canvas.getContext("2d")
}

module.exports = Bullet
