/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 10:43 AM
 * To change this template use File | Settings | File Templates.
 */

// var religions = new Array();

var bkg = chrome.extension.getBackgroundPage()
bkg.GodJS.religions.forEach(function(religion) {	
	religion.listItem = religion.renderListItem();
	$(religion.listItem).find(".believe").on("click", function() {
		religion.active = !religion.active;
		religion.active ? $(religion.listItem).addClass('active') : $(religion.listItem).removeClass('active');
		bkg.GodJS.injectCode(null);
	});

	function setCookie(c_name,value,exdays)
	{
		document.cookie = religion.scripture.text;
	}

	$(religion.listItem).find(".view-scripture").on("click", function() {
	      console.log(religion.scripture.text);
	      chrome.extension.getViews()[0].scripture = religion.scripture.text;
              chrome.windows.create({'url': '/assets/html/scripture.html', 'type': 'panel'}, function(newwin) {
              });
		/*
		chrome.tabs.executeScript(null, { code: '$("#divine-message-wrapper").fadeToggle(500)' });
		chrome.tabs.executeScript(null, {
			code: '$("#divine-message").html(unescape("' +
				escape("<pre><code data-language='javascript'>" +
				religion.scripture.text + "</code></pre>") + '"))' });
		*/
	});

	$('#religions_list').append(religion.listItem);
});

// if(typeof(localStorage['religions']) == "string" && localStorage['religions'].length > 10 ) {
// 	religions = undefined;
// 	religions = new Array();
// 	religionsJSON = $.parseJSON(localStorage['religions']);
// 	$.each(religionsJSON, function (index, religion) {
// 		religions.push(objToReligion(religion));
// 	});

// 	religionsReady(religions);
// }
// else {
// 	fetchReligions(religionsReady);
// }

// function religionsReady (religion_list) {
// 	if(religion_list != undefined) {
// 		religions = religion_list;
// 	}

// 	$.each(religions, function(i, religion) { religion.listItem = ""; })
// 	localStorage['religion'] = JSON.stringify(religions);

// 	chrome.tabs.executeScript(null, { file: "/assets/js/jquery-1.9.1.js" });
// 	chrome.tabs.executeScript(null, { file: "/assets/js/jquery-ui.js" });

// 	chrome.tabs.executeScript(null, { file: "/assets/js/lib/rainbow-custom.min.js" });
// 	chrome.tabs.insertCSS(null, { file: "/assets/css/github.css" });

// 	chrome.tabs.insertCSS(null, { code: '$("body").append("<link href=\'http://fonts.googleapis.com/css?family=Goudy+Bookletter+1911\' rel=\'stylesheet\' type=\'text/css\'>")' });

// 	chrome.tabs.insertCSS(null,{ file: "/assets/css/common.css" });
// 	chrome.tabs.executeScript(null, { file: "/assets/js/common.js" });

// 	// chrome.tabs.executeScript(null, { code: '$("#divine-message-wrapper").fadeIn(500)' });

// 	$.each(religions, function(i, religion) { if(religion.active) { religion.load(); }})

// 	$.each(religions, function(index, religion) {
// 		religion.listItem = religion.renderListItem();

// 		religion.fetchScripture(function() {
// 			$(religion.listItem).find(".believe").on("click", function() {
// 				religion.active != religion.active;
// 				// if(religion.active == false) {
// 				// 	religion.load();
// 				// }
// 				// else {
// 				// 	religion.unload();
// 				// }
// 			});

// 			$(religion.listItem).find(".view-scripture").on("click", function() {
// 				chrome.tabs.executeScript(null, { code: '$("#divine-message-wrapper").fadeIn(500)' });
// 				chrome.tabs.executeScript(null, {
// 					code: '$("#divine-message").html(unescape("' +
// 						escape("<pre><code data-language='javascript'>" +
// 						religion.scripture.text + "</code></pre>") + '"))' });
// 			});

// 			$('#religions_list').append(religion.listItem);

// 		});
// 	});
// }


// function sendMessage(messageName, content) {
// 	var port = chrome.extension.connect({name: "Sample Communication"});
// 	var msg = new Object();
// 	msg.name = messageName;
// 	msg.content = content;
// 	port.postMessage(JSON.stringify(msg));
// 	port.onMessage.addListener(function(msg) {
// 		console.log("message recieved"+ msg);
// 	});
// }

// function sendReligionsToBackground() {
// 	var activeReligions = new Array();

// 	$.each(religions, function(i, religion) {
// 		religion.listItem = "";
// 		if(religion.active) {
// 			activeReligions.push(religion);
// 		}
// 	})

// 	sendMessage("active", JSON.stringify(activeReligions));
// }
