var r = require("../lib/r")
var dogImg

var dog = {
    init: function(canvas) {
        dogImg = r.images.get("dog")
        this.x = canvas.width - dogImg.width - 30,
        this.y = 30
        this.ctx = canvas.getContext("2d")
    },
    move: function() {
        this.ctx.drawImage(dogImg, this.x, this.y)
    }
}

module.exports = dog
