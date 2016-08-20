# chrome-cla-styles-rx
Google Chrome extension to apply the conscript fonts to tagged text for Arxidian conlangs.

- Mainly supported websites
	- twitter.com
	- tumblr.com
	- and probably almost of static webpages

Note that this extension is still almost incomplete and dangerous.

## How to install
Please install at your own risk.

1. Download and extract the [ZIP](https://github.com/qothr/chrome-cla-styles-rx/archive/master.zip) and place it in your preferred directory.
2. Go to `chrome://extensions` in Google Chrome.
3. Check the "Developer mode" checkbox.
4. Click "Load unpacked extension..." and select the extension folder.
5. That's it!

## How it works
The script.js replaces the tag marker `𐍊𐍂𐍇` with `<span class="-cla-styles-rx-font-family">` and `𐍂𐍇𐍊` with `</span>` in the `<p>` tags, and apply `font-family` style to the `.-cla-styles-rx-font-family`. In order to deal with dynamic webpages, MutationObserver callback API is used and the callback performs replacement per page body change. As you see, when tags are not closed, the entire page style might be broken. Please be careful in tweeting/posting your conscript texts with these tag markers.

## Test text
- 𐍊𐍂𐍇 non et xion. tu et to? 𐍂𐍇𐍊
- 𐍊𐍂𐍇 나 와은 나기사 다루오。 𐍂𐍇𐍊
