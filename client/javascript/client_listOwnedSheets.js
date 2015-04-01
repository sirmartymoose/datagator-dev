if (Meteor.isClient) {
    Template.listOwnedSheets.rendered = function () {
        //subscriptions
        Meteor.subscribe("ownerSheetDefinitions");
        console.log('subscribed to ownerSheetDefinitions')
        Meteor.subscribe("ownerSheetData");
        console.log('subscribed to ownerSheetData')



        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })

        $(document).ready(function () {
            showOwnedSheets(getUserSheetReferenceData(getUserSheetDefinitions()), "#results")
        })
    }
}