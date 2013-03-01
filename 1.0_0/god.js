// ==UserScript==
// @name          Joaquin Miller Amazon Affiliate Plugin
// @description   Adds Joaquin Miller associate id to all Amazon links
// @include       *
// @homepage http://ginatrapani.org/workshop/greasemonkey/
// ==/UserScript==

var associateID = 'utf80f1-20';

function handle(doc) {
  var asin = '';
  var items = document.evaluate('descendant::a', doc, null, 7, null);
  for (var i = 0; i < items.snapshotLength; i++){
     var href = items.snapshotItem(i).href;
	   if (href.match(/amazon\.com/i)) {
	   asin = getASIN(href);
	   if (asin != null) {
				items.snapshotItem(i).setAttribute("href", "http://www.amazon.com/dp/" + asin + "/?tag="+associateID);
    		items.snapshotItem(i).removeAttribute('onmousedown');
			}
		}
  }
}

function registerPageHandler() {
  window.AutoPagerize.addFilter(function(pages) {
    pages.forEach(function(page) {
      handle(page);
    });
  });
}

/* Down here is where new URL templates would go. */
function getASIN(href) {
	if(href == null)
	{
		return false;
	}
	
  var asinMatch;
  asinMatch = href.match(/\/exec\/obidos\/ASIN\/(\w{10})/i);
  if (!asinMatch) { asinMatch = href.match(/\/gp\/product\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/exec\/obidos\/tg\/detail\/\-\/(\w{10})/i); }
  if (!asinMatch) { asinMatch = href.match(/\/dp\/(\w{10})/i); }
  if (!asinMatch) { return null; }
  return asinMatch[1];
}


handle(document);
