var Vector = require("../lib/vector")
var Event = require("../lib/event")

function Bullet(canvas, x, y, vx, vy) {
    this.vector = new Vector(x, y, vx, vy)
}

var BulletMethods = {
    move: function() {
        this.vector.update()
    }
}

Bullet = Event.extend(Bullet, BulletMethods)
module.exports = Bullet