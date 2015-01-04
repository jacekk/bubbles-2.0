class Bubbles

	ctx: null
	height: 0
	width: 0

	children: []
	options: {}

	defaultOptions: {
		maxSize: 80
		minSize: 20
		amount: 100
		delay: 1
		r: 0
		g: 144
		b: 255
		strokeWidth: 4
		strokeOpacity: 0.4
		centerOpacity: 0.1
		sideOpacity: 0.5
	}

	cache: {
		strokeColor: ''
		centerColor: ''
		sideColor: ''
	}

	constructor: (canvasId, options)->
		el = document.getElementById canvasId
		if not el or not el.getContext or not el.getContext('2d')
			console.log 'ERR: no 2d context'
			return
		@initProperties(el, options)
		@initIntervals()
		@generateFrame()
		return

	initProperties: (el, options)->
		@height = el.height
		@width = el.width
		@ctx = el.getContext('2d')
		for key, defaultValue of @defaultOptions
			@options[key] = if options[key]? then options[key] else defaultValue
		return

	initIntervals: ()->
		@resetCache()
		setInterval @resetCache, 1000
		setInterval @addChildrenIntv, 50
		setInterval @removeChildrenIntv, 500
		return

	resetCache: ()=>
		color = "rgba(#{@options.r}, #{@options.g}, #{@options.b}, {0})"
		@cache.strokeColor = color.replace '{0}', @options.strokeOpacity
		@cache.centerColor = color.replace '{0}', @options.centerOpacity
		@cache.sideColor = color.replace '{0}', @options.sideOpacity
		return

	addChildrenIntv: ()=>
		if @children.length < @options.amount
			@children.push new Bubble(@)
		return

	removeChildrenIntv: ()=>
		@children = (item for item in @children when not item.reachedTop())
		return

	generateFrame: ()->
		@ctx.clearRect 0, 0, @width, @height
		for item in @children
			@addCtxChild(item)
		for item in @children
			item.move()
		_ = @
		setTimeout ()->
			_.generateFrame()
			return
		, 35
		return

	addCtxChild: (item)->
		@ctx.beginPath()
		@ctx.moveTo item.x + item.radius, item.y
		@ctx.arc item.x, item.y, item.radius, 0, Math.PI * 2, true
		@ctx.fillStyle = item.generateGradient()
		@ctx.fill()
		if item.strokeWidth isnt 0
			@ctx.lineWidth = item.strokeWidth
			@ctx.strokeStyle = item.strokeColor
			@ctx.stroke()
		return
