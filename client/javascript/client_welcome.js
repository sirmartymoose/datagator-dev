if (Meteor.isClient) {

    Template.welcome.rendered = function () {
      
        if(Meteor.user() !== null) {



            //console.log(myOwnedSheets)

            $(document).ready(function() {
                console.log("Doc ready welcome rendered")
                myOwnedSheets = client_getUserSheetsWelcomePage()
                console.log("myOwnedSheetsDefined")
                showOwnedSheets(getUserSheetReferenceData(myOwnedSheets), "#sheetsYouOwn_results")
            })


        }
      
    }

}