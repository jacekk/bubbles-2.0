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
			{
				maxSize: $scope.maxSize
				minSize: $scope.minSize
				amount: $scope.amount
				delay: $scope.delay
				r: $scope.colorRed
				g: $scope.colorGreen
				b: $scope.colorBlue
				strokeWidth: $scope.strokeWidth
				strokeOpacity: $scope.strokeOpacity
				centerOpacity: $scope.centerOpacity
				sideOpacity: $scope.sideOpacity
			}

		$scope.onOptionChange = (modelName, optionName)->
			optionName = modelName unless optionName?
			$scope.bubbles.options[optionName] = $scope[modelName]
			return

		$scope.generateOptions = ()->
			$scope.colorRange = [0].concat(i*16-1 for i in [1..16])
			$scope.strokeWidths = [0..20]
			$scope.zeroToOneRange = (i/10 for i in [0..10])
			$scope.sizeRange = (i*10 for i in [1..15])
			$scope.amountRange = (i*10 for i in [1..50])
			$scope.delayRange = [1..5]
			return

		$scope.initModels = ()->
			# parent
			$scope.minSize = 30
			$scope.maxSize = 80
			$scope.amount = 50
			$scope.delay = 1
			# children
			$scope.strokeWidth = 2
			$scope.strokeOpacity = 0.4
			$scope.centerOpacity = 0.1
			$scope.sideOpacity = 0.2
			# colors
			$scope.colorRed = $scope.colorRange[0]
			$scope.colorGreen = $scope.colorRange[9]
			$scope.colorBlue = $scope.colorRange[-1..][0]
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
