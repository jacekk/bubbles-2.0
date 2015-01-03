class Bubbles

	ctx: null
	height: 0
	width: 0

	refreshInt: 35
	children: []
	options: {}

	defaultOptions: {
		maxSize: 200
		minSize: 10
		amount: 12
		delay: 1
		r: 255
		g: 25
		b: 255
		strokeWidth: 2
		strokeOpacity: 0
		centerOpacity: 1
		sideOpacity: 0.1
	}

	cache: {
		strokeCol: ''
		centerCol: ''
		sideCol: ''
	}

	constructor: (canvasId, options)->
		el = document.getElementById canvasId
		if not el or not el.getContext or not el.getContext('2d')
			console.log 'ERR: no 2d context'
			return
		@initProperties(el, options)
		@initChildren()
		return

	initProperties: (el, options)->
		@height = el.height
		@width = el.width
		@ctx = el.getContext('2d')
		for key, defaultValue of @defaultOptions
			@options[key] = if options[key]? then options[key] else defaultValue
		return

	initChildren: ()->
		return
