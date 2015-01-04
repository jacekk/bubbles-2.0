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
			options = $scope.getBubblesOptions()
			$scope.bubbles = new Bubbles 'display-area', options
			return

		$scope.getBubblesOptions = ()->
			m = $scope.models
			{
				maxSize: m.maxSize
				minSize: m.minSize
				amount: m.amount
				delay: m.delay
				r: m.colorRed
				g: m.colorGreen
				b: m.colorBlue
				strokeWidth: m.strokeWidth
				strokeOpacity: m.strokeOpacity
				centerOpacity: m.centerOpacity
				sideOpacity: m.sideOpacity
			}

		$scope.onOptionChange = (modelName, optionName)->
			optionName = modelName unless optionName?
			$scope.bubbles.options[optionName] = $scope.models[modelName]
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
				colorRed: $scope.ranges.colorRange[0]
				colorGreen: $scope.ranges.colorRange[9]
				colorBlue: $scope.ranges.colorRange[-1..][0]
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
