/*  Proto — Focus Mode
	Quick and Dirty for eBookCraft demo
	To fix (maybe) -> selector specificity iBooks night modes + listen to reading mode change
*/

r(function() {
	// Create buttons and stylesheets
	var switchMark = document.createElement('button'),
		staticStyle = document.createElement('style'),
		dynStyle = document.createElement('style'),
        textControl = ['Enter the matrix', 'Nope, take me out'];

	// Init styles
	staticStyle.setAttribute('type', 'text/css');
	dynStyle.setAttribute('type', 'text/css');
	staticStyle.textContent = '.mark { font-weight: normal;} #switch { margin: 1.5em auto; display: block;}';
	document.head.appendChild(staticStyle);

	// Init and load button
	switchMark.type = 'button';
	switchMark.textContent = textControl[0];
	switchMark.id = 'switch';
	switchMark.addEventListener('touchend', activateMarks, false);
	switchMark.addEventListener('click', activateMarks, false);	
	document.body.insertBefore(switchMark, document.body.firstChild);

	// Dynamic retrieval of current text color + adding of focus styles
	function applyFocus() {
		var textColor = window.getComputedStyle(document.body, null).getPropertyValue('color');
	  // Assumption: color is returned as rgb(a) -> will fail if not
		var rgb = textColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
		var red = rgb[1];
		var green = rgb[2];
		var blue = rgb[3];
		dynStyle.textContent = '.switchMarks .mark { font-weight: bold; color: rgba(' + red + ',' + green + ',' + blue + ',1) !important; } .switchMarks > :not(.mark):not(button) { color: rgba(' + red + ',' + green + ',' + blue + ',0.35)!important;}';
		document.head.appendChild(dynStyle);
	};

	// Toggle focus mode
	function activateMarks(e) {
		e.stopPropagation();
		e.preventDefault();
		document.body.classList.toggle('switchMarks');
		if (document.body.classList.contains('switchMarks')) {
			applyFocus();
			switchMark.textContent = textControl[1];
		} else {
			dynStyle.parentElement.removeChild(dynStyle);
			switchMark.textContent = textControl[0];
		}
	};
});

function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}