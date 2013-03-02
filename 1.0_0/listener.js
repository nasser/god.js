/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 11:06 PM
 * To change this template use File | Settings | File Templates.
 */


chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		alert(2);
		console.log(sender.tab ?
			"from a content script:" + sender.tab.url :
			"from the extension");
		if (request.greeting == "hello")
			sendResponse({farewell: "goodbye"});
	});

