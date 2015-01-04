class Bubble

	x: 0
	y: 0
	speed: 0
	radius: 0
	radians: 0
	radiansInt: 0

	constructor: (@parent)->
		@randomize()
		@initProperties()
		return

	initProperties: ()->
		cache = @parent.cache
		@strokeWidth = @parent.options.strokeWidth
		@strokeColor = cache.strokeColor
		@centerColor = cache.centerColor
		@sideColor = cache.sideColor
		return

	randomize: ()->
		opts = @parent.options
		@radius = Math.round( Math.random() * (opts.maxSize - opts.minSize) + opts.minSize )
		@speed = Math.round(Math.random() * 5 + 4) / opts.delay
		@radians = Math.random() * Math.PI
		if Math.random() > 0.5
			@radians *= -1
		@radiansInt = (Math.random() * 4 - 1) / 100
		@x = Math.round(Math.random() * @parent.width)
		@y = @parent.height + @radius
		return

	move: ()->
		@y -= @speed
		@radians += @radiansInt
		@x -= Math.sin(@radians)
		return

	reachedTop: ()->
		@y < -@radius

	generateGradient: ()->
		x = @x - @radius / 3
		y = @y - @radius / 3
		gradient = @parent.ctx.createRadialGradient(x, y, @radius / 2, x, y, @radius * 1.5)
		gradient.addColorStop 0, @centerColor
		gradient.addColorStop 1, @sideColor
		gradient
