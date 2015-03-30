if (Meteor.isServer) {
  
  Meteor.startup(function () {

    console.log("HELLO I AM SERVER_SHAREDSHEETS")
    console.log(sheetDefinitions.find().fetch())

    Meteor.methods({
        sharedSheets: function (sheetOwnerId) {
        return sheetDefinitions.find( { sharedEmails: Meteor.user().emails[0].address} ).fetch()
        },

        listSharedSheets: function(userEmail){
            console.log('listSharedSheets called')
            var outputObjectArray = []
            var sharedData = sheetDefinitions.find({sharedEmails: userEmail}, {fields: {_id: 1, title: 1, "contributions.userEmail": 1, userId: 1, submitted: 1}}).fetch()
            return sharedData
        }
    });




  });
}
