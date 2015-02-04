if (Meteor.isServer) {
  
  Meteor.startup(function () {

    console.log("HELLO I AM SERVER_SHAREDSHEETS")
    console.log(sheetDefinitions.find().fetch())

    Meteor.methods({
        sharedSheets: function (sheetOwnerId) {
        return sheetDefinitions.find( { sharedEmails: Meteor.user().emails[0].address} ).fetch()
        }
    });


  });
}
