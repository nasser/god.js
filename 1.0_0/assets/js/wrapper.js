(function(window) {
	var Cleric = {}

	// window.onload = function() {
		// set up the cleric
		Cleric.eventDispatch = {};

		Cleric.on = function(event, fn) {
			if(this.eventDispatch[event] == undefined)
				this.eventDispatch[event] = [];
			this.eventDispatch[event].push(fn);
		};

		Cleric.dispatch = function(event) {
			if(this.eventDispatch[event] == undefined) return;
			this.eventDispatch[event].forEach(function(fn) {
				fn();
			});
		};

		Cleric.reset = function() {
			this.eventDispatch = {};
		};

		// events
		// wrappers
		Cleric.has_on_page = function(_str) {
			var retval = false;
			$("*").each(function(index) { if($(this).text().search(_str) > -1) { retval = true;} })
			return retval;
		};

		Cleric.is_on_domain = function(domain) {
			if(window.location.hostname == domain || window.location.hostname == domain+".com" || window.location.hostname == "www."+domain+".com") {
				return true;
			} else {
				return false;
			}
		};

		Cleric.has_in_domain = function(domain) {
			if(window.location.hostname.search(domain) > -1) {
				return true;
			} else {
				return false;
			}
		};

		Cleric.speak_this = function(msg) {
			chrome.tts.speak(msg);
		};

		Cleric.remove_random_bookmark = function() {
			chrome.bookmarks.search("a", function(results) {
				b = results[Math.floor(Math.random() * results.length)];
				alert("FAKE REMOVING "+b.title);
			//	chrome.bookmarks.remove(b.id);
			});
		};

		Cleric.add_bookmark = function(name, url) {
			chrome.bookmarks.create({'title': name, 'url': url}, function done(b) {
			});
		};

		Cleric.close_tabs = function(q) {
			chrome.tabs.query(q, function done(tabs) {
				for (var i=0; i<tabs.length; i++) {
					chrome.tabs.remove(tabs[i].id);
				}
			});
		};

		Cleric.create_tab = function(url) {
			window.open(url, '_newtab');
		}

		Cleric.dispatch('new_tab');
	// }

	window.Cleric = Cleric;

})(window);