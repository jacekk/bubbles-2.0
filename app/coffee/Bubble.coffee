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
		@x = Math.round( Math.random() * @parent.width * 0.5 + @parent.width * 0.25)
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
