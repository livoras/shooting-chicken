var $ = require("../lib/util").$
var Event = require("../lib/event")
var r = require("../lib/r")
var canvas = null
var cannonImg = null
var ctx = null

function GunConstructor() {
    this.ctx = null
    this.angle = 0
    this.MAX_ANGLE = 60
    this.MIN_ANGLE = -60
    this.originX = 0
    this.originY = 0
    this.GAP = 2
}

var gunPrototype = {
    init: function(cvs) {
        canvas = cvs
        cannonImg = r.images.get("gun")
        ctx = canvas.getContext("2d")
        this.img = cannonImg
        this.initControl()
        this.initMove()
    },
    move: function() {
        this.updateOrigin()
        ctx.save()
        ctx.translate(canvas.width / 2, (canvas.height - cannonImg.height * 0.5))
        ctx.rotate(this.angle * Math.PI / 180)
        ctx.drawImage(cannonImg, -cannonImg.width / 2, -cannonImg.height / 2, cannonImg.width, cannonImg.height)
        ctx.restore()
    },
    updateOrigin: function() {
        this.originX = canvas.width / 2
        this.originY = canvas.height - cannonImg.height / 2
    },
    initControl: function() {
        var that = this
        canvas.addEventListener("touchstart", function() {
            var x = event.touches[0].pageX
            var y = event.touches[0].pageY
            that.touchX = x
            that.isControl = that.isInCannon(x, y)
        })
    },
    initMove: function() {
        var that = this
        canvas.addEventListener("touchmove", function(event) {
            if (!that.isControl) return
            var x = event.touches[0].pageX
            var y = event.touches[0].pageY
            var originX = that.originX
            var originY = that.originY
            var tan = (x - originX) / (y - originY)
            var newTangle = -Math.atan(tan) * 180 / Math.PI
            if (Math.abs(newTangle) > 60) return
            that.angle = newTangle
        })  
    },
    isInCannon: function(x, y) {
        var upperHeight = canvas.height
        var lowerHeight = canvas.height - cannonImg.height
        var upperWidth = canvas.width / 2 + cannonImg.height / 2
        var lowerWidth = canvas.width / 2 - cannonImg.height / 2
        if (y > lowerHeight &&
            y < upperHeight &&
            x > lowerWidth &&
            x < upperWidth) return true
        return false
    }
}

var Gun = Event.extend(GunConstructor, gunPrototype)
module.exports = new Gun()
