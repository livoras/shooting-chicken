var assert = require("./helpers").assert
var OP = require("../lib/objects-pool")
var op = new OP

var objs = []
op.newInstance = function() {
    var newObj = {}
    objs.push(newObj)
    return newObj
}

// test
for (var i = 0, len = 100; i < len; i++) {
    op.acquire()
}
assert("Object should has 30 object", op.alives.length + op.deads.length === 30)

// set up
var deadCount = 0
op.on("died", function (chick) {
    assert("chick should not be an undefined", chick !== void 8)
    deadCount++
})

var aliveCount = 0
op.on("alive", function () {
    aliveCount++
})

// test
op.die(null)
assert("should not die the object that doesn't exist", deadCount === 0)

// test
op.die(objs[0])
assert("should die an object", 
    deadCount === 1 && 
    op.deads.length === 1 && 
    op.alives.length == 29
)

// test
var dieAll = 0
op.on("all died", function() {
    dieAll++
})
op.dieAll()
assert("should die all", 
    deadCount === 30 &&
    op.deads.length === 30 &&
    op.alives.length === 0 &&
    dieAll === 1
)

// test
var aliveAll = 0
op.on("all alive", function() {
    aliveAll++
})
op.aliveAll()
assert("should alive all", 
    aliveCount === 30 &&
    op.deads.length === 0 &&
    op.alives.length === 30 &&
    aliveAll === 1
)
