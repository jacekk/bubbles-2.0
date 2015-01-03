angular
	.module 'ngApp', []

	.filter 'fixed', ['$filter', ($filter)->
		(input, precision = 1)->
			input.toFixed(precision)
	]
	.controller 'OptionsController', ['$scope', ($scope)->
		$scope.strokeWidths = [0..4]
		$scope.zeroToOneRange = (i/10 for i in [0..10])
		return
	]
