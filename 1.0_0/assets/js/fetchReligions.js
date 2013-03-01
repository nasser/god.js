/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 10:56 AM
 * To change this template use File | Settings | File Templates.
 */

function fetchReligions() {
    /* Should grab any matching github repositories and return them as an array */
	var religions = new Array();
	$.getJSON("https://api.github.com/legacy/repos/search/:exalted.book.of", function(data) {
		$.each(data.repositories, function(repo) {
			//console.log(data.repositories[repo].owner);
			var owner = data.repositories[repo].owner;
			var repo = data.repositories[repo].name;
			var repoBase = "https://raw.github.com/"+owner+"/"+repo+"/master/";
			$.getJSON(repoBase+"manifest.json", function(manifest) {
				religions.push(new Religion(manifest.name, repoBase+manifest.books[0], repoBase+"icon.png"));
			});
		});
	});
	return religions;
}
