/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */

var __religions_waiting = 0;
var __religions = new Array();

function fetchReligions(callback) {
	__religions = new Array();
	
	$.getJSON("https://api.github.com/legacy/repos/search/:exalted.book.of", function(data) {
		__religions_waiting =data.repositories.length;
		$.each(data.repositories, function(repo) {
			//console.log(data.repositories[repo].owner);
			var owner = data.repositories[repo].owner;
			var repo = data.repositories[repo].name;
			var repoBase = "https://raw.github.com/"+owner+"/"+repo+"/master/";
			$.getJSON(repoBase+"manifest.json", function(manifest) {
				__religions.push(new Religion(manifest.name, repoBase+manifest.books[0], repoBase+"icon.png"));
				__religions_waiting--;
				if(__religions_waiting == 0) {
					callback(__religions);
				}
				console.log(__religions_waiting);
			});
		});
	});
}
