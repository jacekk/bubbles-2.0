class Bubble

	x: 0
	y: 0
	speed: 0
	radius: 0
	radians: 0
	radiansInt: 0

	constructor: (@parent)->
		@randomize()
		return

	randomize: ()->
		opts = @parent.options
		@radius = Math.round( Math.random() * (opts.maxSize - opts.minSize) + opts.minSize )
		@x = Math.round(Math.random() * @parent.width)
		@speed = Math.round(Math.random() * 5 + 4) / opts.delay
		@radians = Math.random() * Math.PI
		if Math.random() > 0.5
			@radians *= -1
		@radiansInt = (Math.random() * 4 - 1) / 100
		@y = @parent.height + @radius + Math.random() * @parent.height / 4
		return

	move: ()->
		@y -= @speed
		@radians += @radiansInt
		@x -= Math.sin(@radians)
		return

	reachedTop: ()->
		@y < -@radius

	generateGradient: ()->
		grdX = @x - @radius / 3
		grdY = @y - @radius / 3
		gradient = @parent.ctx.createRadialGradient(grdX, grdY, @radius / 2, grdX, grdY, @radius * 1.5)
		gradient.addColorStop(0, @parent.cache.centerColor)
		gradient.addColorStop(1, @parent.cache.sideColor)
		gradient
