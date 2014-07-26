var Chick = require("./chick")
var ObjectsPool = require("../lib/objects-pool")

var chickManger = new ObjectsPool
var canvas = null

chickManger.newInstance = function() {
    var newChick = new Chick(canvas)
    onChickDie(newChick)
    onChickNotCatch(newChick)
    return newChick
}

function onChickDie(chick) {
    chick.on("die", function() {
        chickManger.die(chick)
    })
}

chickManger.on("died", function(chick) {
    chick.isToRemove = true
    chick.reset()
})

function onChickNotCatch(chick) {
    chick.on("not catch", function() {
        chickManger.emit("not catch", chick)
    })
}

chickManger.on("alive", function(chick) {
    chick.isToRemove = false
})

chickManger.init = function(cvs) {
    canvas = cvs
}

module.exports = chickManger
