/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 10:57 AM
 * To change this template use File | Settings | File Templates.
 */

function objToReligion (o) {
	r = new Religion(o.name, o.scriptureLocation, o.iconLocation);
	r.scripture.text = o.scripture.text;
	r.scripture.script = o.scripture.script;
	r.active = o.active;
	return r;
}

function Religion(religionName, scriptureLocation, iconLocation) {
    this.name = religionName;
	this.safeName = function() {
		if(this.name == undefined) {
			return "";
		}
		else {
			return this.name.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
		}
	}
    this.scriptureLocation = scriptureLocation;
    this.scripture = new Object({
        text : undefined,
        script : undefined
    });
    this.iconLocation = iconLocation;
    this.listItem = undefined;
	this.active = false;

    this.fetchScripture = function(callback) {
        /* Loads scripture from this.scriptureLocation into this.scriptureText as a string, then calls the interpreter
         * and the loading script.
         *
         * Right now this uses one of my (Will Brand's) servers, beatrixruf.com, as a proxy, to avoid cross-domain
         * sandboxing issues.
         */

        if(this.scriptureText == undefined) {
            var fuckYouScopeIssuesThisIsTheReligion = this;
            $.ajax({url: "".concat("http://beatrixruf.com/fetch.php?script=", this.scriptureLocation),
                success: function(data) {
                    fuckYouScopeIssuesThisIsTheReligion.scripture.text = data;
                    fuckYouScopeIssuesThisIsTheReligion.interpretScripture();
                    callback(); },
                complete: function(data) {
                    console.log(data);
                }
            })
        }
    }

    this.interpretScripture = function () {
        if(this.scripture.text == undefined) {
            this.fetchScripture(this.interpretScripture);
        }
        else {
            this.scripture.script = interpretScripture(this.scripture.text);
            return this.scripture.script;
        }
    }

    this.load = function () {
        if(this.scripture.script == undefined) {
            this.fetchScripture(this.load);
        }
        else {
			// if we have a scripture script ready to go
            chrome.tabs.executeScript(null, { code: this.scripture.script });

			this.active = true;
			$("." + this.safeName()).addClass('active');

			$.each(religions, function(i, religion) { religion.listItem = ""; })

			console.log("Loaded!")
			console.log(religions[0])
			localStorage['religions'] = JSON.stringify(religions);
			console.log(religions[0])
        }
    }

    this.unload = function() {
		/*
			This doesn't actually unload any already loaded Javascript from a religion.
			TODO: Fix that.
		 */

		this.active = false;
		$("." + this.safeName()).removeClass('active');

		$.each(religions, function(i, religion) { religion.listItem = ""; })
		localStorage['religions'] = JSON.stringify(religions);
		console.log("Unloaded!")

    }

    this.renderListItem = function() {
        listItem = $("<li></li>").addClass('religion');

        religionIcon = $("<img />").addClass('religion-icon').prop("src", this.iconLocation);
        listItem.append(religionIcon);

        religionName = $("<span></span>").addClass('religion-name').text(this.name);
        listItem.append(religionName);

        viewScriptureLink = $("<a></a>").addClass('view-scripture').text("View Scripture");
        listItem.append(viewScriptureLink);

        believeLink = $("<a></a>").addClass('believe').text("Believe!");
        listItem.append(believeLink);

		if(this.active) {
			listItem.addClass('active');
		}

		listItem.addClass(this.safeName());

        return listItem;
    }
}