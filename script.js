
var style_font_ext = document.createElement("style");
style_font_ext.appendChild(document.createTextNode(
	'@font-face{ font-family: "kardinal"; src: local("kardinal"), url("' + chrome.extension.getURL('kardinal.woff') + '") format("woff"); } @font-face{ font-family: "farf"; src: local("farf"), url("' + chrome.extension.getURL('farf.woff') + '") format("woff"); } .-cla-styles-rx-font-family { font-family: "kardinal", "farf" !important; } .-cla-styles-rx-invisible-marker { font-size: 0; line-height: 0; }'));
document.head.appendChild(style_font_ext);

var insert_tags = function (muts)
{
	// for tumblr, do not replace in the editor
	if(window.location.href.match(/^https?:\/\/[a-zA-Z0-9\-]+\.tumblr\.com\/.*/))
	{
		Array.prototype.forEach.call(document.querySelectorAll('div:not(.editor) > p'), replaceInNode);
	}

	else
	{
		Array.prototype.forEach.call(document.getElementsByTagName('p'), replaceInNode);
	}
};

insert_tags();

// support dynamic webpages
var o = new MutationObserver(insert_tags);
var conf =
{
	childList:true,
	subtree: true
};
o.observe(document.body, conf);

function forEachTextNodes(parentNode, callback) {
	if (!parentNode.hasChildNodes()) {
		return;
	}
	if (parentNode.classList && parentNode.classList.contains("-cla-styles-rx-replaced")) {
		return;
	}
	var childNodes = Array.prototype.slice.call(parentNode.childNodes);
	childNodes.forEach(function (node) {
		if (node.nodeType == Node.TEXT_NODE) {
			callback(node, parentNode);
		} else {
			forEachTextNodes(node, callback);
		}
	});
}

function replaceInNode(p) {
	forEachTextNodes(p, function(node, parentNode) {
		if (node.nodeValue.match(/𐍊𐍂𐍇.*?𐍂𐍇𐍊/)) {
			var newNodes = node.nodeValue.split(/(𐍊𐍂𐍇.*?𐍂𐍇𐍊)/g).map(function (text) {
				var match, span, subSpan;
				if ((match = text.match(/^𐍊𐍂𐍇\s?(.*?)\s?𐍂𐍇𐍊$/)) == null) {
					return document.createTextNode(text);
				} else {
					span = document.createElement("span");
					span.classList.add("-cla-styles-rx-replaced");

					subSpan = document.createElement("span");
					subSpan.classList.add("-cla-styles-rx-invisible-marker");
					subSpan.appendChild(document.createTextNode("𐍊𐍂𐍇"));
					span.appendChild(subSpan)

					subSpan = document.createElement("span");
					subSpan.classList.add("-cla-styles-rx-font-family");
					subSpan.appendChild(document.createTextNode(match[1]));
					span.appendChild(subSpan)

					subSpan = document.createElement("span");
					subSpan.classList.add("-cla-styles-rx-invisible-marker");
					subSpan.appendChild(document.createTextNode("𐍂𐍇𐍊"));
					span.appendChild(subSpan)

					return span;
				}
			});
			var nextNode = node.nextSibling
			parentNode.removeChild(node);
			newNodes.forEach(function(newNode) {
				parentNode.insertBefore(newNode, nextNode);
			});
		}
	});
}
