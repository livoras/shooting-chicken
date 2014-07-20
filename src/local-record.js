
exports.read = function() {
    var record = localStorage.getItem("stats")
    if (record) {
        return JSON.parse(record)
    }
}

exports.write = function(status) {
    localStorage.setItem("stats", JSON.stringify(status))
}
