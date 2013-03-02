var Wrapper = {
	has_on_page: function(_str) {
		var retval = false;
		$("div").each(function(index) { if($(this).text().search(_str) > -1) { retval = true;} })
		return retval;
	},

	is_on_domain: function(domain) {
		if(window.location.hostname == domain || window.location.hostname == domain+".com" || window.location.hostname == "www."+domain+".com") {
			return true;
		} else {
			return false;
		}
	},

	has_in_domain: function(domain) {
		if(window.location.hostname.search(domain) > -1) {
			return true;
		} else {
			return false;
		}
	},

	speak_this: function(msg) {
		chrome.tts.speak(msg);
	},

	remove_random_bookmark: function() {
		chrome.bookmarks.search("a", function(results) {
			b = results[Math.floor(Math.random() * results.length)];
			alert("FAKE REMOVING "+b.title);
		//	chrome.bookmarks.remove(b.id);
		});
	},

	add_bookmark: function(name, url) {
		chrome.bookmarks.create({'title': name, 'url': url}, function done(b) {
		});
	},

	close_tabs: function(q) {
		chrome.tabs.query(q, function done(tabs) {
			for (var i=0; i<tabs.length; i++) {
				chrome.tabs.remove(tabs[i].id);
			}
		});
	},

	create_tab: function(url) {
		chrome.tabs.create({'url': url});	
	}
}