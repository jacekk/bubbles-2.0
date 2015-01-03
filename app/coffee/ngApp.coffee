angular
	.module 'ngApp', []

	.filter 'fixed', ['$filter', ($filter)->
		(input, precision = 1)->
			input.toFixed(precision)
	]

	.controller 'OptionsController', ['$scope', ($scope)->

		$scope.init = ()->
			$scope.generateOptions()
			$scope.generateModels()
			# angular.element('#display-options select').selectBoxIt()
			$scope.adjustLayout()
			$scope.bubbles = new Bubbles 'display-area', {}
			return

		$scope.onOptionChange = (modelName, optionName)->
			optionName = modelName unless optionName?
			console.log modelName, $scope[modelName]
			$scope.bubbles.options[optionName] = $scope[modelName]
			return

		$scope.generateOptions = ()->
			$scope.colorRange = [0].concat(i*16-1 for i in [1..16])
			$scope.strokeWidths = [0..20]
			$scope.zeroToOneRange = (i/10 for i in [0..10])
			return

		$scope.generateModels = ()->
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
