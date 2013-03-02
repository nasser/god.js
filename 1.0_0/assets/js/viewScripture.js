
function viewScripture() {
	var text = chrome.extension.getViews()[0].scripture;

	Rainbow.color(text, 'god', function(hl) {
		console.log(hl);
		$('#divine-message-new pre').html(hl);
	});
}

$(document).ready(function() {
	viewScripture();
});
