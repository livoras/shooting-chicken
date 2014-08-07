var Vector = require("../lib/vector")
var Event = require("../lib/event")
var r = require("../lib/r")
var canvas
var ctx
var bulletImg = null


function Bullet(x, y, vx, vy) {
    this.vector = new Vector(x, y, vx, vy)
}

var BulletMethods = {
    reset: function(x, y, vx, vy) {
        this.vector.x = x 
        this.vector.y = y
        this.vector.vx = vx
        this.vector.vy = vy
        this.radius = 10
    },
    move: function() {
        this.vector.update()
        if (this.isOutOfBorder()) {
            this.emit("out of border")
        }
        this.draw()
    },
    draw: function() {
        ctx.save()
        ctx.translate(this.vector.x, this.vector.y)
        ctx.beginPath()
        ctx.arc(0, 0, this.radius, 2 * Math.PI, false)
        var pattern = ctx.createPattern(bulletImg, "repeat")
        ctx.fillStyle = pattern
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    },
    isOutOfBorder: function() {
        var vector = this.vector
        return vector.x < 0 || 
               vector.x > canvas.width ||
               vector.y < 0 ||
               vector.y > canvas.height
    }
}

Bullet = Event.extend(Bullet, BulletMethods)
Bullet.init = function(cvs) {
    canvas = cvs
    ctx = canvas.getContext("2d")
    bulletImg = r.images.get("bullet")
}

module.exports = Bullet
