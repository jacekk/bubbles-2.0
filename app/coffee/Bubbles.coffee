class Bubbles

	ctx: null
	height: 0
	width: 0

	refreshInt: 35
	children: []
	options: {}

	defaultOptions: {
		maxSize: 150
		minSize: 20
		amount: 100
		delay: 2
		r: 255
		g: 25
		b: 255
		strokeWidth: 2
		strokeOpacity: 0
		centerOpacity: 1
		sideOpacity: 0.1
	}

	cache: {
		strokeColor: 'rgba(0, 255, 0, 0.7)'
		centerColor: 'rgba(0, 255, 0, 0.1)'
		sideColor: 'rgba(0, 255, 0, 0.3)'
	}

	constructor: (canvasId, options)->
		el = document.getElementById canvasId
		if not el or not el.getContext or not el.getContext('2d')
			console.log 'ERR: no 2d context'
			return
		@initProperties(el, options)
		@initChildren()
		@generateFrame()
		return

	initProperties: (el, options)->
		@height = el.height
		@width = el.width
		@ctx = el.getContext('2d')
		for key, defaultValue of @defaultOptions
			@options[key] = if options[key]? then options[key] else defaultValue
		return

	initChildren: ()->
		_ = @
		setInterval ()->
			# remove old elements
			_.children = (item for item in _.children when not item.reachedTop())
			# add new elements
			if _.children.length < _.options.amount
				_.children.push new Bubble(_)
			return
		, 250
		return

	generateFrame: ()->
		@ctx.clearRect 0, 0, @width, @height
		@ctx.lineWidth = @options.strokeWidth
		@ctx.strokeStyle = @cache.strokeColor
		for item in @children
			@addCtxChild(item)
		for item in @children
			item.move()
		_ = @
		setTimeout ()->
			_.generateFrame()
			return
		, @refreshInt
		return

	addCtxChild: (item)->
		@ctx.beginPath()
		@ctx.moveTo item.x + item.radius, item.y
		@ctx.arc item.x, item.y, item.radius, 0, Math.PI * 2, true
		grdX = item.x - item.radius / 3
		grdY = item.y - item.radius / 3
		grd = @ctx.createRadialGradient grdX, grdY, item.radius / 2, grdX, grdY, item.radius * 1.5
		grd.addColorStop 0, @cache.centerColor
		grd.addColorStop 1, @cache.sideColor
		@ctx.fillStyle = grd # @todo move gradient generation to Bubble class
		@ctx.fill()
		@ctx.stroke()
		return
