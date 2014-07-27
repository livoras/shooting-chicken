var ObjectsPool = require("../lib/objects-pool")
var Bullet = require("./bullet")

var canvas
var ctx
var game
var cannon
var timer = null

var SPEED = 10
var DURATION = 200

var bulletManager = new ObjectsPool

bulletManager.newInstance = function() {
    // body...
    var vector = getCurrentVector()
    var bullet = new Bullet(vector.x, vector.y, vector.vx, vector.vy)
    onOutOfBorder(bullet)
    return bullet
}

bulletManager.on("alive", function(bullet) {
    var vector = getCurrentVector()
    bullet.reset(vector.x, vector.y, vector.vx, vector.vy)
})

function getCurrentVector() {
    var angle = cannon.angle / 180 * Math.PI
    var sin = Math.sin(angle)
    var cos = Math.cos(angle)
    var originX = cannon.originX
    var originY = cannon.originY
    var line = cannon.img.height / 2
    var vector = {
        x: originX + line * sin,
        y: originY - line * cos,
        vx: SPEED * sin,
        vy: -SPEED * cos
    }
    return vector
}

function onOutOfBorder(bullet) {
    bullet.on("out of border", function() {
        game.remove(bullet)
        bulletManager.die(bullet)
    })
}

bulletManager.init = function(cvs, g, c) {
    canvas = cvs
    game = g
    cannon = c
    ctx = canvas.getContext("2d")
    Bullet.init(canvas)
}

bulletManager.start = function() {
    clearInterval(timer)
    timer = setInterval(function() {
        var bullet = bulletManager.acquire()
        if (bullet) {
            game.add(bullet)
        }
    }, DURATION)
}

bulletManager.stop = function() {
    clearInterval(timer)
    bulletManager.dieAll()
}

module.exports = bulletManager