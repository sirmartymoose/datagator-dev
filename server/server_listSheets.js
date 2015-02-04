if (Meteor.isServer) {
  
  Meteor.startup(function () {

    console.log("HELLO I AM SERVER_LISTSHEETS")
    console.log(sheetDefinitions.find().fetch())

    Meteor.methods({
        listSheets: function (sheetOwnerId) {
        return sheetDefinitions.find({userId: Meteor.userId()}).fetch()
        }
    });


  });
}
