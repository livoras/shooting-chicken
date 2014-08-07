var collision = {}
var chicks = null
var bullets = null
var scoreChick = null

collision.init = function(_chickManager, _bulletManager, catchAndScore) {
	chickManager = _chickManager
	bulletManager = _bulletManager
	scoreChick = catchAndScore
}

collision.move = function() {
	chickManager.alives.forEach(function(chick) {
		if (chick.isCatch) return;
		bulletManager.alives.forEach(function(bullet) {
			if (isChickAndBulletCollision(chick, bullet)) {
				scoreChick(chick)
				bulletManager.killBullet(bullet)
			}
		})
	})
}

function isChickAndBulletCollision(chick, bullet) {
	var radius = bullet.radius
	var x = chick.x - radius
	var y = chick.y - radius
	var height = chick.height
	var width = chick.width
	if ( bullet.vector.x >= x && 
		(bullet.vector.x <= (x + width + radius * 2)) &&
		(bullet.vector.y >= y) &&
		(bullet.vector.y <= (y + height + radius * 2)) ) return true
	return false
}

module.exports = collision
