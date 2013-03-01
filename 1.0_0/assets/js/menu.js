/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 10:43 AM
 * To change this template use File | Settings | File Templates.
 */

fetchReligions(religionsReady);

function religionsReady (religion_list) {

	if(religion_list) {
		var religions = religion_list;
	}



	chrome.tabs.executeScript(null, { file: "/assets/js/jquery-1.9.1.js" });
	chrome.tabs.executeScript(null, { file: "/assets/js/jquery-ui.js" });

	chrome.tabs.executeScript(null, { file: "/assets/js/lib/rainbow-custom.min.js" });
	chrome.tabs.insertCSS(null,{ file: "/assets/css/github.css" });

	chrome.tabs.insertCSS(null,{ file: "/assets/css/common.css" });
	chrome.tabs.executeScript(null, { file: "/assets/js/common.js" });

	$.each(religions, function(index, religion) {
		religion.listItem = religion.renderListItem();

		religion.fetchScripture(function() {
			$(religion.listItem).find(".believe").on("click", function() {
				if(religion.active == false) {
					religion.load();
				}
				else {
					religion.unload();
				}
			});

	$(religion.listItem).find(".view-scripture").on("click", function() {
				chrome.tabs.executeScript(null, { code: '$("#divine-message-wrapper").fadeIn(500)' });

				chrome.tabs.executeScript(null, { code: "".concat('$("#divine-message").html("',
															'<pre><code data-language="javascript">',
																religion.scripture.text,
															'</code></pre>',
														'");') });
			});
			$('#religions_list').append(religion.listItem);

		});
	});
}



