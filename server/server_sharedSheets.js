if (Meteor.isServer) {
  
  Meteor.startup(function () {

    Meteor.methods({
        sharedSheets: function (sheetOwnerId) {
        return sheetDefinitions.find( { sharedEmails: Meteor.user().emails[0].address} ).fetch()
        },

        listSharedSheets: function(userEmail){
            var outputObjectArray = []
            var sharedData = sheetDefinitions.find({sharedEmails: userEmail}, {sort: {submitted: -1}}, {fields: {_id: 1, title: 1, "contributions.userEmail": 1, userId: 1, submitted: 1}}).fetch()
            return sharedData
        }, 
        listWelcomeSharedSheets: function(userEmail){
            var outputObjectArray = []
            var sharedData = sheetDefinitions.find({sharedEmails: userEmail}, {limit: 2, sort: {submitted: -1}}, {fields: {_id: 1, title: 1, "contributions.userEmail": 1, userId: 1, submitted: 1}}).fetch()
            return sharedData
        }, 
        listWelcomeOwnedSheets: function(){
            var sharedData = sheetDefinitions.find({userId: Meteor.userId()}, {sort: {submitted: -1}}).fetch()
            return sharedData
            
            
        }
    });




  });
}


