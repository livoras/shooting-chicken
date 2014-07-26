var Event = require("../lib/event")
var r = require("../lib/r")

var chickImg
var chickImg2
var dieImg
var catchImg

var gravity = 0.1
var INIT_VETOR_Y = 5
var INIT_VETOR_X = 4

function Chick(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.reset()
}

var chickPrototype = {
    reset: function() {
        this.isDie = false
        this.width = chickImg.width
        this.height = chickImg.height
        this.isCatch = false
        this.x = canvas.width / 4 + Math.random() * (canvas.width / 2)
        this.y = canvas.height * 0.4
        this.opacity = 1
        this.vx = -INIT_VETOR_X + Math.random() * INIT_VETOR_X * 2
        this.vy =  -3 + (-Math.random() * INIT_VETOR_Y)
        this.currentImg = chickImg
        this.count = 0
    },
    move: function() {
        if (!this.isDie) {
            this.updatePos()
            this.detectBorder()
        }
        this.draw()
    },
    updatePos: function() {
        this.x += this.vx
        this.y += this.vy
        if (!this.isDie) {
            this.vy += gravity
        }
    },
    detectBorder: function() {
        if(this.x < 5) {
            this.vx *= -0.65
            this.vy *= 0.7
            this.x = 5
        } else if (this.x + chickImg.width > this.canvas.width) {
            this.vx *= -0.65
            this.vy *= 0.7
            this.x = this.canvas.width - chickImg.width
        }

        if (this.y > this.canvas.height - chickImg.height - 130) {
            this.emit("not catch")
            this.die()
        } else if (this.y < 5) {
            this.vy *= -0.65
            this.vx *= 0.7
            this.y = 5
        }
    },
    die: function() {
        this.isDie = true
        this.vy = 0
        this.vx = 0
        var that = this
        setTimeout(function() {
            that.emit("die")
        }, 1000)
    },
    draw: function() {
        var ctx = this.ctx
        var img = this.isDie ? dieImg : this.nextImg()
        var img = this.isCatch ? catchImg: img
        ctx.save()
        if (this.isDie) {
            ctx.globalAlpha = this.opacity
            this.opacity -= 0.01
        }
        ctx.drawImage(img, this.x, this.y)
        ctx.restore()
    },
    nextImg: function() {
        if (this.count < 10) {
            this.count++
            return this.currentImg
        }
        this.count = 0
        this.currentImg = this.currentImg == chickImg2 ? chickImg : chickImg2
        return this.currentImg
    }
}

Chick = Event.extend(Chick, chickPrototype)

Chick.init = function() {
    chickImg = r.images.get("chick")
    chickImg2 = r.images.get("chick2")
    dieImg = r.images.get("die")
    catchImg = r.images.get("chick-in-catch")
}

module.exports = Chick
