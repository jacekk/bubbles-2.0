class Bubbles

	defaultOptions: {
		maxSize: 200
		minSize: 10
		amount: 12
		delay: 1
		strokeWid: 2
		color1: 255
		color2: 25
		color3: 255
		strokeOpac: 0
		centerOpac: 1
		sideOpac: 0.1
	}

	ctx: null

	runtime: {
		strokeCol: ''
		centerCol: ''
		sideCol: ''
		refreshInt: 35
		height: 0
		width: 0
		children: []
	}

	constructor: (canvasId, options)->
		el = document.getElementById canvasId
		if not el or not el.getContext or not el.getContext('2d')
			console.log 'ERR: no 2d context'
			return
		@ctx = el.getContext('2d')
		@overrideOptions options
		@init()
		return

	overrideOptions: (options)->
		console.log '@todo overrideOptions'
		return

	init: ()->
		console.log '@todo init'
		return
