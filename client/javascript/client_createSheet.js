// Refactored march 31st

Template.createSheet.events({
    'submit form': function (e) {
        e.preventDefault();
        
        if(validate_createSheet() == true){
        
        sheetCols = assembleColumns();
        var sheet = {
            sheetOwnerId: Meteor.userId(),
            title: $(e.target).find('[name=title]').val(),
            contributions: [],
            sharedEmails: [],
            columns: sheetCols
        };

        Meteor.call('sheetInsert', sheet, function (error, result) {
            // display the error to the user and abort
            if (error)
                return alert(error.reason);
            Router.go('viewSheet', {_id: result._id});
            Session.set("mySheetId", result._id)
        });
        }
    }, // end submit form functions

    "click #addColumn": function (e) {
        e.preventDefault();
        $("#allColGroup").append(colString);
    } // End add Column functions

}); // End CreateSheet Template Events


function assembleColumns() {
    colsArray = []
    defaultObj = {columnName: "sheetOwnerAuthor", whoView: "owner", whoEdit: "owner", dataType: "text"}
    colsArray.push(defaultObj)
    $(".colGroup").each(function () {
        colName = $(this).find("#columnName").val();
        whoView = $(this).find("#whoView").val();
        whoEdit = $(this).find("#whoEdit").val();
        dataType = $(this).find("#dataType").val();
        colObj = {columnName: colName, whoView: whoView, whoEdit: whoEdit, dataType: dataType};
        colsArray.push(colObj)
    });
    return colsArray
} // End AssembleColumns

var colString =
    "<div class='colGroup' ><div  class='list-group-item' id='colGroup'>" +
    "<div class='form-group'> " +
    "	<label for='columnName'>Column Name</label>" +
    "	<input type='text' class='form-control' id='columnName' placeholder='Name your column...'> " +
    "</div>" +
    "<div class='form-group'>" +
    "<label for='columnName'>Data Type</label>" +
    "<select class='form-control' id='dataType'>" +
    "<option value='text'>Text</option>" +
    "</select>" +
    "</div>" +
    "<div class='form-group'>" +
    "<label for='columnName'>Who Can View</label>" +
    "<select class='form-control' id='whoView'>" +
    "<option value='all'>Everyone can View</option>" +
    "<option value='owner'>Only I can view</option>" +
    "</select>" +
    "</div>" +
    "<div class='form-group'>" +
    "<label for='columnName'>Who Can Edit</label>" +
    "<select class='form-control' id='whoEdit'>" +
    "<option value='guest'> Only Guests can Edit</option>" +
    "<option value='owner'>Only I can Edit</option>" +
    "</select>" +
    "</div>" +
    "<div hidden class='form-group'>" +
    "<label for='columnName'>Required</label>" +
    "<div class='checkbox'>" +
    "<label> " +
    "<input type='checkbox' id='required' value=''>" +
    "Required Field for Guests to Enter" +
    "</label>" +
    "</div>" +
    "</div>" +
    "</div> </div>";
					 
					 
