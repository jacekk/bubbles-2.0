Bubbles 2.0
==

Old canvas 2D project rewriten in CoffeeScript to play a little bit with its concept of classes. AngularJS was used to bind app options with the plugin equivalents. To use the plugin, include Bubble and Bubbles classes in that order, and init the later one like that:

```javascript
new Bubbles('id-of-your-canvas-element', {});
```

There are some settings available:

```javascript
{
	maxSize: 80
	minSize: 20
	amount: 100
	delay: 1
	red: 0
	green: 144
	blue: 255
	strokeWidth: 4
	strokeOpacity: 0.4
	centerOpacity: 0.1
	sideOpacity: 0.5
}
```

which can also be modified after the plugin was created. Quick and dirty example:

```javascript
var bubbles = new Bubbles('id-of-your-canvas-element', { green: 0 });
// after a while
bubbles.options.red = 255;
```


