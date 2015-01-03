(($, window)->
	adjustLayout = ()->
		canvasEl = $('#display-area')[0]
		canvasEl.width = window.innerWidth
		topBarPaddAndBorder = 9
		topBarHei = $('#display-options').height() + topBarPaddAndBorder
		canvasEl.height = window.innerHeight - topBarHei
		return
	$(window).load ()->
		$('#display-options select').selectBoxIt()
		adjustLayout()
		new Bubbles 'display-area', {}
		return
	return
)(jQuery, window)
