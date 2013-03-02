/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 11:52 PM
 * To change this template use File | Settings | File Templates.
 */

	/*
var activeReligions = new Array();
if(typeof(localStorage['activeReligions']) == "string" && localStorage['activeReligions'].length > 10 ) {
	religionsJSON = $.parseJSON(localStorage['activeReligions']);
	$.each(religionsJSON, function (index, religion) {
		activeReligions.push(objToReligion(religion));
	});
	activeReligions.forEach(function(religion, index) {
		chrome.tabs.executeScript(null, { code: religion.scripture.script });
	})
}*/

// fetch and compile religions at start
fetchReligions(function(religion_ary) { 
	GodJS.religions = religion_ary;
	GodJS.religions.forEach(function(religion) {
		console.log('compiling ' + religion.name)
		religion.fetchScripture();
	})
});

function setupTab(tabid) {
	chrome.tabs.executeScript(tabid, { file: "/assets/js/jquery-1.9.1.js" });
	chrome.tabs.executeScript(tabid, { file: "/assets/js/jquery-ui.js" });
	chrome.tabs.executeScript(tabid, { file: "/assets/js/lib/rainbow-custom.min.js" });
	chrome.tabs.executeScript(tabid, { code: '$("body").append("<link href=\'http://fonts.googleapis.com/css?family=Goudy+Bookletter+1911\' rel=\'stylesheet\' type=\'text/css\'>")' });
	chrome.tabs.insertCSS(tabid, { file: "/assets/css/github.css" });
	chrome.tabs.insertCSS(tabid,{ file: "/assets/css/common.css" });
	chrome.tabs.executeScript(tabid, { file: "/assets/js/common.js" });
}

chrome.tabs.query({}, function(tabs) {
	tabs.forEach(function(tab) {
		console.log(tab.title)
		setupTab(tab.id);
	});
});

chrome.tabs.onUpdated.addListener(function(tabid, change) {
	if(change.url) {
		setupTab(tabid);
		GodJS.injectCode(tabid);
	}
});

// chrome.extension.onConnect.addListener(function(port) {
// 	console.log("Connected .....");
// 	port.onMessage.addListener(function(msg) {

// 		message = $.parseJSON(msg);

// 		console.log("message recieved " + message);

// 		if(message.name == "active") {
// 			localStorage['activeReligions'] = message.content;

// 			activeReligions = new Array();

// 			religionsJSON = $.parseJSON(message.content);
// 			$.each(religionsJSON, function (index, religion) {
// 				activeReligions.push(objToReligion(religion));
// 			});

// 			activeReligions.forEach(function(religion, index) {
// 				chrome.tabs.executeScript(null, { code: religion.scripture.script });
// 			})

// 			alert('religions loaded')
// 		}
// 	});
// });