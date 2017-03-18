/* Super early version of the blitz debug tools.
   Like a pre-pre-pre-pre-pre-pre-alpha, really. */

r(function() {
  
var logger = document.getElementById('logger');

['log','warn','error'].forEach(function (verb) {
    console[verb] = (function (method, verb, log) {
        return function (text) {
            method(text);
            var msg = document.createElement('span');
            msg.classList.add(verb);
            msg.textContent = verb + ': ' + text;
            logger.appendChild(msg);
        };
    })(console[verb].bind(console), verb, logger);
});

function getStyle(element, cssProp) {
  var styleLog,
      stylesTarget = document.querySelector(element);

  if (stylesTarget) {
    var cssValue = window.getComputedStyle(stylesTarget, null).getPropertyValue(cssProp),
        tagName = element.toLowerCase();

    styleLog = tagName + " \{ " + cssProp + ": " + cssValue + "; \}";
    console.log(styleLog);
  } else {
    styleLog = "Sorry we can’t find styles for '" + element + "'. Either the element doesn’t exist in the DOM or your selector is not correct.";  
    console.error(styleLog);
  }
}

/* Usage

getStyle("body", "font-size");
getStyle(".tada cite", "text-align"); 

*/

function getAllStyles(element, pseudo) {
  var styleLog,
      stylesTarget = document.querySelector(element);

  if (stylesTarget) {
    var tagSelector = element.toLowerCase();
  
    if (!pseudo) {
      var cssObj = window.getComputedStyle(stylesTarget, null);
    } else {
	  var cssObj = window.getComputedStyle(stylesTarget, pseudo);
	  var tagSelector = element.toLowerCase() + pseudo.toLowerCase();
    } 
	styleLog = tagSelector + " \{";
    for (k = 0; k < cssObj.length; k++) { 
        cssObjProp = cssObj.item(k)
		styleLog += "\n\t" + cssObjProp + ": " + cssObj.getPropertyValue(cssObjProp) + ";";
    }
    styleLog += "\n\}\n";
    console.log(styleLog);
  } else {
    styleLog = "Sorry we can’t find styles for '" + element + "'. Either the element doesn’t exist in the DOM or your selector is not correct.";  
    console.error(styleLog);
  }
}

/* Usage

getAllStyles("h1");
getAllStyles("a", ":link");
getAllStyles("blockquote p");

*/

var customStyles = ["font-family", "font-size", "line-height", "width", "margin", "padding", "color", "background-color", "text-indent", "text-align"];

function getCustomStyles(element, pseudo) {
  var styleLog,
      stylesTarget = document.querySelector(element);

  if (stylesTarget) {
    var tagSelector = element.toLowerCase();
    if (!pseudo) {
      var cssObj = window.getComputedStyle(stylesTarget, null);
    } else {
	  var cssObj = window.getComputedStyle(stylesTarget, pseudo);
	  var tagSelector = element.toLowerCase() + pseudo.toLowerCase();
    } 
	styleLog = tagSelector + " \{";
    for (var k = 0; k < customStyles.length; k++) { 
        var cssObjProp = customStyles[k];
		styleLog += "\n\t" + cssObjProp + ": " + cssObj.getPropertyValue(cssObjProp) + ";";
    }
    styleLog += "\n\}\n";
    console.log(styleLog);
  } else {
    styleLog = "Sorry we can’t find styles for '" + element + "'. Either the element doesn’t exist in the DOM or your selector is not correct.";  
    console.error(styleLog);
  }
}

/* Usage

getCustomStyles("h1");
getCustomStyles("a", ":link");
getCustomStyles("p:first-child");

*/

function printDom() {
  var dom = document.documentElement.outerHTML;
  console.log(dom);
}

/* Usage

printDom();

*/

// Has id ? has class ? has attribute ? is nested ? (blockquote, aside, figure, etc.)
// exception: pre logger
// cursor help

var debug = false;

if (debug) {
  document.body.style.cursor = "help";
  document.body.addEventListener("click", debugStyles, false);
//  document.body.addEventListener("touchend", debugStyles, false);
}

function debugStyles(e) {
	  e.preventDefault();
  var txt,
      el = e.target,
      tagSelector = el.tagName.toLowerCase(),
      cssObj = window.getComputedStyle(el, null);

	
  txt = tagSelector + " \{";
  for (var k = 0; k < customStyles.length; k++) { 
      var cssObjProp = customStyles[k];
	  txt += "\n\t" + cssObjProp + ": " + cssObj.getPropertyValue(cssObjProp) + ";";
  }
  txt += "\n\}\n";
  console.log(txt);
  return false;
}


// EXEC



});

function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}