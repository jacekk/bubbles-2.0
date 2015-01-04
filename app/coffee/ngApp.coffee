angular
	.module 'ngApp', []

	.filter 'fixed', ['$filter', ($filter)->
		(input, precision = 1)->
			input.toFixed(precision)
	]

	.controller 'OptionsController', ['$scope', ($scope)->

		$scope.init = ()->
			$scope.generateOptions()
			$scope.initModels()
			$scope.adjustLayout()
			$scope.bubbles = new Bubbles 'display-area', $scope.models
			return

		$scope.onOptionChange = (modelName)->
			$scope.bubbles.options[modelName] = $scope.models[modelName]
			return

		$scope.generateOptions = ()->
			$scope.ranges = {
				colorRange: [0].concat(i*16-1 for i in [1..16])
				strokeWidths: [0..20]
				zeroToOneRange: (i/10 for i in [0..10])
				sizeRange: (i*10 for i in [1..15])
				amountRange: (i*10 for i in [1..50])
				delayRange: [1..5]
			}
			return

		$scope.initModels = ()->
			$scope.models = {
				# parent
				minSize: 30
				maxSize: 80
				amount: 50
				delay: 1
				# children
				strokeWidth: 2
				strokeOpacity: 0.4
				centerOpacity: 0.1
				sideOpacity: 0.2
				# colors
				red: $scope.ranges.colorRange[0]
				green: $scope.ranges.colorRange[9]
				blue: $scope.ranges.colorRange[-1..][0]
			}
			return

		$scope.adjustLayout = ()->
			$scope.canvas = angular.element('#display-area')[0]
			$scope.canvas.width = window.innerWidth
			topBarPadAndBorder = 9
			topBarHei = angular.element('#display-options').height() + topBarPadAndBorder
			$scope.canvas.height = window.innerHeight - topBarHei
			return

		return
	]
