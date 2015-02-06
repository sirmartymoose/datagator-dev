if (Meteor.isClient) {
      
      sheetEvent = function(sheetId, event){
            var time = new Date()
            var sheetId = sheetId
            var userEmail = Meteor.user().emails[0].address
            var userId = Meteor.userId()
            var event = event
      
            sheetHistory.insert({sheetId: sheetId, time: time, userEmail: userEmail, userId: userId, event: event})
            

      }
      
      
      
}