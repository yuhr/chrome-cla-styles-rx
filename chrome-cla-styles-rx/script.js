
var style_font_ext = document.createElement("style");
style_font_ext.appendChild(document.createTextNode(
	'@font-face{ font-family: "kardinal"; src: url("' + chrome.extension.getURL('kardinal.woff') + '") format("woff"); } @font-face{ font-family: "farf"; src: url("' + chrome.extension.getURL('farf.woff') + '") format("woff"); } .-cla-styles-rx-font-family { font-family: "kardinal", "farf" !important; } .-cla-styles-rx-invisible-marker { opacity: 0; white-space: pre; letter-spacing: -0.4em; }'));
document.head.appendChild(style_font_ext);

var insert_tags = function (muts)
{

	// for twitter, some confusing lines needed,
	// because simple replacements make the links in the tweets disabled
	if(window.location.href.match(/^https:\/\/twitter\.com\/.*/))
	{
		Array.prototype.forEach.call(document.getElementsByTagName('p'), function (p)
		{
			Array.prototype.forEach.call(p.childNodes, function (n)
			{
				// only replace in text nodes
				if(n.nodeName == '#text')
				{
					if(n.nodeValue.match(/𐍂𐍇𐍊/))
					{
						var nodes = [];
						Array.prototype.forEach.call(n.nodeValue.split(/\s?𐍂𐍇𐍊/), function (nv)
						{
							if(nv.match(/𐍊𐍂𐍇/))
							{
								var left = nv.split(/𐍊𐍂𐍇\s?/);
								nodes.push(document.createTextNode(left[0]));
								var e = document.createElement('span');
								e.classList.add('-cla-styles-rx-font-family');
								e.appendChild(document.createTextNode(left[1]));
								nodes.push(e);
							}
							else nodes.push(document.createTextNode(nv));
						});
						nodes.forEach(function (node, i)
						{
							if(0==i) p.replaceChild(node, n);
							else p.insertBefore(nodes[nodes.length-i], nodes[0].nextSibling);
						});
					}
				}
			});
		});
	}

	// for tumblr, do not replace in the editor
	else if(window.location.href.match(/^https?:\/\/[a-zA-Z0-9\-]+\.tumblr\.com\/.*/))
	{
		Array.prototype.forEach.call(document.querySelectorAll('div:not(.editor) > p'), function (p)
		{
			p.innerHTML = p.innerHTML.replace(/𐍊𐍂𐍇\s?/g, '<span class="-cla-styles-rx-font-family">').replace(/\s?𐍂𐍇𐍊/g, '</span>')
		});
	}

	// for other sites, simply replace the markers,
	// but in order to deal with inputs in a form,
	// it might be better to leave the markers, turning them invisible
	else
	{
		Array.prototype.forEach.call(document.getElementsByTagName('p'), function (p)
		{
			p.innerHTML = p.innerHTML.replace(/𐍊𐍂𐍇\s?/g, '<span class="-cla-styles-rx-invisible-marker">𐍊𐍂𐍇</span><span class="-cla-styles-rx-font-family">').replace(/\s?𐍂𐍇𐍊/g, '</span><span class="-cla-styles-rx-invisible-marker">𐍂𐍇𐍊</span>')
		});

	}
};

// support dynamic webpages
var o = new MutationObserver(insert_tags);
var conf =
{
	attributes: true,
	subtree: true
};
o.observe(document.body, conf);
