var score = $("#stats-score")
var lifes = $("#stats-lifes")
var level = $("#stats-level")
var mask = $("#mask")
var stats = $("#stats")
var highest = $("#highest")
var scoreShow = $("#score-show")
var youScore = $("#your-score")
var newRecord = $("#new-record")
var scoreLocal = 0

var cacheScore = 0
var cacheLevel = 0
var cacheLifes = 0

exports.hidePlannel = function () {
    mask.style.display = "none"
    showStats()
    showScore()
    hideNewRecord()
}

exports.showPannel = function (status) {
    mask.style.display = "block"
    hideStats()
    updateScore()
}

exports.updateStats = function(status) {
    if (cacheLifes !== status.lifes) {
        var lifesHTML = ""
        for (var i = 0, len = status.lifes; i < len; i++) {
            lifesHTML += "<image src='img/love.png'>"
        }
        lifes.innerHTML = lifesHTML
        cacheLifes = status.lifes
    }
    if (cacheLevel !== status.level) {
        level.innerHTML = status.level
        cacheLevel = status.level
    }
    if (cacheScore !== status.score) {
        cacheScore = status.score
        score.innerHTML = scoreLocal = status.score
    }
}

exports.updateRecord = function(num) {
    highest.innerHTML = num
}

exports.showNewRecord = function() {
    newRecord.style.display = "inline-block"
}

function hideNewRecord() {
    newRecord.style.display = "none"
}

function $(selector) {
    return document.querySelector(selector)
}

function showStats() {
    stats.style.display = "block"

}

function hideStats() {
    stats.style.display = "none"
}

function showScore() {
    scoreShow.style.display = "block"
}

function updateScore() {
    youScore.innerHTML = scoreLocal
}


hideStats()
