var Game = require("../lib/game")
var Chick = require("../src/chick")
var dog = require("../src/dog")
var gun = require("../src/gun")
var pannel = require("../src/pannel")
var chickManager = require("../src/chick-manager")
var localRecord = require("../src/local-record")

var game = new Game
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var world = null
var throwTimer = null
var playAroundChicks = []
var record = localRecord.read() || {highest: 0}
var LEVEL_START_DURATION = 800

var levelTimer = null
var LEVEL_UP_DURATON = 10 // s
var isMobile = false

var status = {
    lifes: 5,
    score: 0,
    level: 1
}

game.on("init", function() {
    drawBackground()
    chickManager.init(canvas)
    resizeCanvas()

    listenMouseDown()
    listenResize()
    listenNotCatch()
    listenPannelButtons()
    renderRecord()
    playAround()

    dog.init(canvas)
    gun.init(canvas)

    game.add(world)
    game.add(gun)
})

game.on("start", function() {
    pannel.hidePlannel()
    stopPlayAround()
    pannel.updateStats(status)
    startToThrowChick()
    startToCountLevel()
})

game.on("stop", function() {
    stopToCountLevel()
    stopThrowingChick()
    resetStatus()
    cleanScreen()
    pannel.showPannel()
    playAround()
})

function resetStatus() {
    status.lifes = 5
    status.score = 0
    status.level = 1
}

function cleanScreen() {
    chickManager.dieAll()
}

function playAround(arguments) {
    // if (playAroundChicks.length == 0) {
    //     for(var i = 0, len = 4; i < len; i++) {
    //         var chick = new Chick(canvas)
    //         playAroundChicks.push(chick)
    //         chick.on("die", function() {
    //             console.log('....die')
    //             chick.reset()
    //         })
    //     }
    // }
    console.log('play around')
    // playAroundChicks.forEach(function(chick) {
    //     game.add(chick)
    // })
}

function stopPlayAround() {
    // game.pause()
    console.log('stopPlayAround')
    // playAroundChicks.forEach(function(chick) {
    //     game.remove(chick)
    // })
}

function listenNotCatch() {
    chickManager.on("not catch", function() {
        if (game.isResume) {
            status.lifes--
            pannel.updateStats(status)
            if (status.lifes == 0) {
                gameover()
            }
        }
    })
}

var bgImg = new Image()
bgImg.addEventListener("load", function() {
    game.init()
})
bgImg.src = "img/bg.png"

function drawBackground() {
    world = {
        move: function() {
            ctx.save()
            ctx.fillStyle = "#FFFCDD"
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            pattern = ctx.createPattern(bgImg, "repeat")
            ctx.translate(0, canvas.height - bgImg.height)
            ctx.fillStyle = pattern
            ctx.fillRect(0, 0, canvas.width, bgImg.height)
            ctx.restore()
        }
    }
    world.move()
}

function gameover() {
    if (status.score > record.highest) {
        record.highest = status.score
        renderRecord()
        localRecord.write(record)
        newRecord()
    }
    setTimeout(function() {
        game.stop()
    })
}

function newRecord() {
    pannel.showNewRecord()
}

function stopThrowingChick() {
    clearInterval(throwTimer)
}

function startToThrowChick() {
    throwTimer = setTimeout(function() {
        var chick = chickManager.acquire()
        if (chick) {
            game.add(chick)
        } else {
            console.log("chicks is out of range.")
        }
        startToThrowChick()
    }, LEVEL_START_DURATION - 50 * (status.level - 1))
}

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

function listenResize() {
    window.addEventListener("resize", resizeCanvas)
}

function listenMouseDown() {
    canvas.addEventListener("touchstart", function(event) {
        isMobile = true
        event.preventDefault()
        var x = event.touches[0].pageX
        var y = event.touches[0].pageY
        shootChicks(x, y)
    })
    canvas.addEventListener("touchend", function(event) {
        event.preventDefault()
    })
    canvas.addEventListener("mousedown", function(event) {
        if (!isMobile) {
            shootChicks(event.clientX, event.clientY)
            console.log("is not a mobile")
        }
    })
    canvas.addEventListener("dblclick", function(event) {
        event.stopPropagation()
        event.preventDefault()
    })
}

function shootChicks(x, y) {
    if (game.isResume) {
        chickManager.alives.forEach(function(chick) {
            if (x > chick.x && 
                x < chick.x + chick.width &&
                y > chick.y &&
                y < chick.y + chick.height) {
                if (!chick.isDie) {
                    chick.isCatch = true
                    chick.die()
                    score()
                }
            }
        })
    }
}

function score() {
    status.score += 100
    pannel.updateStats(status)
}

function listenPannelButtons() {
    var play = document.getElementById("play")
    function start() {
        if (game.isStop) {
            game.start()
        }
    }
    play.addEventListener("touchstart", start)
    play.addEventListener("mousedown", start)
}

function renderRecord() {
    pannel.updateRecord(record.highest)
}

function startToCountLevel() {
    levelTimer = setInterval(function() {
        status.level++
        showDog()
        pannel.updateStats(status)
    }, LEVEL_UP_DURATON * 1000)
}

function showDog() {
    dog.isToRemove = false
    game.add(dog)
    setTimeout(function() {
        game.remove(dog)
    }, 1000)
}

function stopToCountLevel() {
    clearInterval(levelTimer)
}

// TESTS, should be removed
require("./tests")
