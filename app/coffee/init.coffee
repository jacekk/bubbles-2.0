(($, window)->
	adjustLayout = ()->
		topBarHei = 50
		canvasEl = $('#display-area')[0]
		canvasEl.width = window.innerWidth
		canvasEl.height = window.innerHeight - topBarHei
		return
	$(window).load ()->
		$('#display-options select').selectBoxIt()
		adjustLayout()
		new Bubbles 'display-area', {
			amount: 24
			delay: 2
		}
		return
	return
)(jQuery, window)
