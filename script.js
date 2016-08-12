
var style_font_ext = document.createElement("style");
style_font_ext.appendChild(document.createTextNode(
	'@font-face{ font-family: "kardinal"; src: url("' + chrome.extension.getURL('kardinal.woff') + '") format("woff"); } @font-face{ font-family: "farf"; src: url("' + chrome.extension.getURL('farf.woff') + '") format("woff"); } .-font-ext { font-family: "kardinal", "farf" !important; }'));
document.head.appendChild(style_font_ext);

var insert_tags = function (muts)
{
	Array.prototype.forEach.call(document.getElementsByTagName('p'), function (p)
	{
		if(window.location.href.match(/^https:\/\/twitter\.com\/.*/))
		{
			Array.prototype.forEach.call(p.childNodes, function (n)
			{
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
								e.classList.add('-font-ext');
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
		}
		else
		{
			p.innerHTML = p.innerHTML.replace(/𐍊𐍂𐍇\s?/g, '<span class="-font-ext">').replace(/\s?𐍂𐍇𐍊/g, '</span>')
		}
	});
};

var o = new MutationObserver(insert_tags);
var conf =
{
	attributes: true,
	subtree: true
};
o.observe(document.body, conf);
