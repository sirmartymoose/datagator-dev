if (Meteor.isClient) {
    Template.listOwnedSheets.rendered = function () {

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })

        $(document).ready(function () {
            showOwnedSheets(getUserSheetReferenceData(getUserSheetDefinitions()), "#results")
        })
    }
}