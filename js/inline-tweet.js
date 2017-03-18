// Get closest
	var getClosest = function ( elem, selector ) {
		var firstChar = selector.charAt(0);
		var supports = 'classList' in document.documentElement;
		var attribute, value;
		if ( firstChar === '[' ) {
			selector = selector.substr( 1, selector.length - 2 );
			attribute = selector.split( '=' );
				if ( attribute.length > 1 ) {
					value = true;
					attribute[1] = attribute[1].replace( /"/g, '' ).replace( /'/g, '' );
				}
		}
		for ( ; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode ) {
			if ( firstChar === '.' ) {
				if ( supports ) {
					if ( elem.classList.contains( selector.substr(1) ) ) {
						return elem;
					}
				} else {
					if ( new RegExp('(^|\\s)' + selector.substr(1) + '(\\s|$)').test( elem.className ) ) {
						return elem;
					}
				}
			}
        if ( firstChar === '#' ) {
            if ( elem.id === selector.substr(1) ) {
                return elem;
            }
        }
        if ( firstChar === '[' ) {
            if ( elem.hasAttribute( attribute[0] ) ) {
                if ( value ) {
                    if ( elem.getAttribute( attribute[0] ) === attribute[1] ) {
                        return elem;
						}
					} else {
						return elem;
					}
				}
			}
			if ( elem.tagName.toLowerCase() === selector ) {
				return elem;
			}
		}
		return null;
	};

var inlineTweets = document.querySelectorAll('*[data-inline-tweet]');

if ( inlineTweets ) {

	var twitterLogo = '<svg style="height: 1em;" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" version="1.1" xmlns:cc="http://creativecommons.org/ns#" viewBox="0 0 182.66667 150.66667" xmlns:dc="http://purl.org/dc/elements/1.1/"><metadata id="metadata8"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/></cc:Work></rdf:RDF></metadata><defs id="defs6"><clipPath id="clipPath20" clipPathUnits="userSpaceOnUse"><path id="path18" d="m0 10.012h1366.9v1110.9h-1366.9z"/></clipPath></defs><g id="g10" transform="matrix(1.3333 0 0 -1.3333 0 150.67)"><g id="g12" transform="scale(.1)"><g id="g14"><g id="g16" clip-path="url(#clipPath20)"><path id="path22" d="m1366.9 989.39c-50.27-22.309-104.33-37.387-161.05-44.18 57.89 34.723 102.34 89.679 123.28 155.15-54.18-32.15-114.18-55.47-178.09-68.04-51.13 54.49-124.02 88.55-204.68 88.55-154.89 0-280.43-125.55-280.43-280.43 0-21.988 2.457-43.398 7.258-63.91-233.08 11.68-439.72 123.36-578.04 293.01-24.141-41.4-37.969-89.567-37.969-140.97 0-97.308 49.489-183.13 124.76-233.44-45.969 1.437-89.218 14.058-127.03 35.078-0.043-1.18-0.043-2.348-0.043-3.52 0-135.9 96.68-249.22 224.96-275-23.512-6.41-48.281-9.8-73.86-9.8-18.089 0-35.628 1.711-52.781 5 35.711-111.41 139.26-192.5 262-194.77-96.058-75.23-216.96-120.04-348.36-120.04-22.621 0-44.961 1.332-66.918 3.91 124.16-79.568 271.55-125.98 429.94-125.98 515.82 0 797.86 427.31 797.86 797.93 0 12.153-0.28 24.223-0.79 36.25 54.77 39.571 102.31 88.95 139.93 145.2" fill="#FFFFFF"/></g></g></g></g></svg>';




	function buildInlineTweet(inlineTweet) {

		var tweetTextSanitize = inlineTweet.textContent;


		// TWEET LINK VARIABLES
		var tweetVia = inlineTweet.dataset.inlineTweetVia ? inlineTweet.dataset.inlineTweetVia : "";
		var tweetTextEncoded = "“" + encodeURIComponent(tweetTextSanitize) + "” — " + tweetVia;
		var pageURL = inlineTweet.dataset.inlineTweetUrl ? inlineTweet.dataset.inlineTweetUrl : window.location.href;
		var tweetHashtags = inlineTweet.dataset.inlineTweetTags ? "&hashtags="+inlineTweet.dataset.inlineTweetTags : "";
		var tweetLink = "https://twitter.com/intent/tweet/?text="+tweetTextEncoded+tweetHashtags+"&url="+pageURL;


		// SPAN ELEMENT
		var tweetTextContainer = document.createElement('span');
		tweetTextContainer.classList.add("tweeta");


		// ANCHOR ELEMENT
		var link = document.createElement('a');
		link.target = "_blank";
		link.href = tweetLink;
		link.innerHTML = twitterLogo;
    tweetTextContainer.appendChild(link)
		
		var section = getClosest(inlineTweet, "section");
		section.appendChild(tweetTextContainer);

	}


	for ( var i = 0; i < inlineTweets.length; i++ ) {
		buildInlineTweet(inlineTweets[i])
	}

}