/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 10:57 AM
 * To change this template use File | Settings | File Templates.
 */

function Religion(religionName, scriptureLocation, iconLocation) {
    this.name = religionName;
    this.scriptureLocation = scriptureLocation;
    this.scripture = new Object({
        text : undefined,
        script : undefined
    });
    this.iconLocation = iconLocation;
    this.active = false;
    this.listItem = undefined;

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
            chrome.tabs.executeScript(null, { code: this.scripture.script });
        }
    }

    this.unload = function() {

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

        return listItem;
    }
}