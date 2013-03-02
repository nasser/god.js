

function has_on_page(_str) {
	var retval = false;
	$("div").each(function(index) { if($(this).text().search(_str) > -1) { retval = true;} })
	return retval;
}

function is_on_domain(domain) {
	if(window.location.hostname == domain || window.location.hostname == domain+".com" || window.location.hostname == "www."+domain+".com") {
		return true;
	} else {
		return false;
	}
}

function has_in_domain(domain) {
	if(window.location.hostname.search(domain) > -1) {
		return true;
	} else {
		return false;
	}
}

function speak_this(msg) {
	chrome.tts.speak(msg);
}

function remove_random_bookmark() {
	chrome.bookmarks.search("a", function(results) {
		b = results[Math.floor(Math.random() * results.length)];
		alert("FAKE REMOVING "+b.title);
	//	chrome.bookmarks.remove(b.id);
	});
}

function add_bookmark(name, url) {
	chrome.bookmarks.create({'title': name, 'url': url}, function done(b) {
	});
}

function close_tabs(q) {
	chrome.tabs.query(q, function done(tabs) {
		for (var i=0; i<tabs.length; i++) {
			chrome.tabs.remove(tabs[i].id);
		}
	});
}

function create_tab(url) {
	chrome.tabs.create({'url': url});	
}
