/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 2:24 PM
 *
 * Common.js: Universal functions for aspiring deities. Loaded into every tab.
 */

// Load a wrapper for a divine message.
if ($("#divine-message-wrapper").length == 0) {
    divineMessage = $("<div></div>").attr("id", "divine-message");
    divineMessage.text("God says: sup? ");

    divineMessageWrapper = $("<div></div>").attr("id", "divine-message-wrapper");
    divineMessageWrapper.append(divineMessage);
    $("body").append(divineMessageWrapper);

    divineMessageWrapper.hide();
}





