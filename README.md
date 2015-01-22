## Bubbles 2.0

Old canvas 2D project rewriten in CoffeeScript to play a little bit with its concept of classes. AngularJS was used to bind app options with the plugin equivalents. To use the plugin, download the compresed *build/Bubbles.combined.min.js* file, link it in your html file, and then init the main class just like that:

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

#### Automagic installation

If you use bower and wiredep package to manage your components, just run ```bower install jacekk/bubbles-2.0 --save``` command. Wiredep, through **grunt** task (e.g. ```grunt build```) will insert required file into a predefined section of your html file. The result could look like the one below.

```html
<!-- build:js(.) scripts/vendor.js -->
<!-- bower:js -->
<script src="bower_components/bubbles-2.0/build/Bubbles.combined.min.js"></script>
<!-- endbower -->
<!-- endbuild -->
```

You can check this project files to check how all of this is organized, or just [read more](https://github.com/taptapship/wiredep).
