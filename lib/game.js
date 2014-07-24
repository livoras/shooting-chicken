require("./init")

var Event = require("./event")

var Game = function() {
    this.isStart = false
    this.isStop = true
    this.isResume = false
    this.isPause = true
    this.sprits = [] 
    this.timer = null
}

var gameMethods = {
    init: function() {
        this.emit("init")
        this.render()
    },
    start: function() {
        this.isStart = true
        this.isStop = true
        this.resume()
        this.emit("start")
    },
    stop: function() {
        this.isStart = false
        this.isStop = true
        this.pause()
        this.emit("stop")
    },
    pause: function() {
        this.isPause = true
        this.isResume = false
        this.emit("pause")
    },
    resume: function() {
        this.isResume = true
        this.isPause = false
        this.emit("resume")
    },
    render: function() {
        var that = this
        function _run() {
            var sprits = that.sprits
            that.sprits = []
            for (var i = 0, len = sprits.length; i < len; i++) {
                var sprit = sprits[i]
                if (!sprit.isToRemove) {
                    var sprit = sprits[i]
                    that.sprits.push(sprit)
                    sprit.move()
                } 
            }
            that.timer = requestAnimationFrame(_run)
        }
        _run()
    },
    add: function(sprit) {
        if (!(typeof sprit.move === 'function')) {
            throw "Sprit should have a `move` function."
        }
        this.sprits.push(sprit)
        this.emit("sprit added", sprit)
    },
    remove: function(sprit) {
        sprit.isToRemove = true
        this.emit("sprit removed", sprit)
    }
}

module.exports = Event.extend(Game, gameMethods)
