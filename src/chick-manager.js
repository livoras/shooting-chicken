var Chick = require("./chick")
var Event = require("./event")

// chickManger is to maintain the objects pool
// for reducing memory consuming.
function ChickManager() {
    this.aliveChicks = []
    this.deadChicks = []
    this.MAX_CHICKS = 30
}

var chickManagerPrototype = {
    init: function(canvas) {
        this.canvas = canvas
        return this
    },
    acquire: function() {
        if (this.deadChicks.length > 0) {
            var newChick = this.deadChicks.pop()
            newChick.isToRemove = false
            this.aliveChicks.push(newChick)
        } else {
            var total = this.aliveChicks.length + this.deadChicks.length
            if (total < this.MAX_CHICKS) {
                var newChick = new Chick(this.canvas)
                this.onDie(newChick)
                this.onNotCatch(newChick)
                this.aliveChicks.push(newChick)
            }
        }
        return newChick
    },
    onDie: function(toDieChick) {
        var that = this
        toDieChick.on("die", function() {
            toDieChick.isToRemove = true
            toDieChick.reset()
            that.removeFromAlive(toDieChick)
        })
    },
    onNotCatch: function(chick) {
        var that = this
        chick.on("not catch", function() {
            that.emit("not catch", chick)
        })
    },
    removeFromAlive: function(toRemoveChick) {
        for (var i = 0, len = this.aliveChicks.length; i < len; i++) {
            var chick = this.aliveChicks[i]
            if (chick == toRemoveChick) {
                this.aliveChicks.splice(i, 1)
                this.deadChicks.push(toRemoveChick)
                break
            }
        }
    },
    removeFromDie: function(toRemoveChick) {
        for (var i = 0, len = this.deadChicks.length; i < len; i++) {
            var chick = this.deadChicks[i]
            if (chick == toRemoveChick) {
                toRemoveChick.isToRemove = false
                this.deadChicks.splice(i, 1)
                this.aliveChicks.push(toRemoveChick)
                break
            }
        }
    },
    dieAll: function() {
        var chick = this.aliveChicks.pop()
        while(this.aliveChicks.length) {
            chick.isToRemove = true
            chick.reset()
            this.deadChicks.push(chick)
            chick = this.aliveChicks.pop()
        }
    }
}

var ChickManager = Event.extend(ChickManager, chickManagerPrototype)
module.exports = new ChickManager
