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



chrome.extension.onConnect.addListener(function(port) {
	console.log("Connected .....");
	port.onMessage.addListener(function(msg) {

		message = $.parseJSON(msg);

		console.log("message recieved " + message);

		if(message.name == "active") {
			localStorage['activeReligions'] = message.content;

			activeReligions = new Array();

			religionsJSON = $.parseJSON(message.content);
			$.each(religionsJSON, function (index, religion) {
				activeReligions.push(objToReligion(religion));
			});

			activeReligions.forEach(function(religion, index) {
				chrome.tabs.executeScript(null, { code: religion.scripture.script });
			})

			alert('religions loaded')
		}
	});
});