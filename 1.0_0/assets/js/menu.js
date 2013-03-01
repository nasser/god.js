/**
 * Created with JetBrains WebStorm.
 * User: Will
 * Date: 3/1/13
 * Time: 10:43 AM
 * To change this template use File | Settings | File Templates.
 */

religions = fetchReligions();

$.each(religions, function(index, religion) {
    religionLI = $("<li></li>").addClass('religion');

    religionIcon = $("<img />").addClass('religion-icon').prop("src", religion.iconLocation);
    religionLI.append(religionIcon);

    religionName = $("<span></span>").addClass('religion-name').text(religion.name);
    religionLI.append(religionName);

    $('#religions_list').append(religionLI);

    $(religionLI).on("click", function() {
        if(religion.active == false) {
            religion.load();
        }
        else {
            religion.unload();
        }
    });
});



