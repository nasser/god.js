/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 11:52 PM
 * To change this template use File | Settings | File Templates.
 */

chrome.extension.onConnect.addListener(function(port) {
	console.log("Connected .....");
	port.onMessage.addListener(function(msg) {
		console.log("message recieved "+ msg);
		alert('message received by background');
		port.postMessage("Hi Popup.js");
	});
});