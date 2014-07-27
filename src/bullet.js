var Vector = require("../lib/vector")
var Event = require("../lib/event")
var canvas
var ctx

function Bullet(x, y, vx, vy) {
    this.vector = new Vector(x, y, vx, vy)
}

var BulletMethods = {
    reset: function(x, y, vx, vy) {
        this.vector.x = x 
        this.vector.y = y
        this.vector.vx = vx
        this.vector.vy = vy
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
        ctx.arc(0, 0, 10, 2 * Math.PI, false)
        ctx.fillStyle = "#000"
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
}

module.exports = Bullet
