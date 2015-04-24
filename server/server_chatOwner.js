if (Meteor.isServer) {
  
    // Data Schema 
    // {"_id": "akdkd", "sheetId": "akdkf", "messageGuest": "6666", "isOwner": 0, "messageContent": "Hello There", "messageTime": 10:030}
    
          Meteor.publish("messages", function (sheetId, messageGuest) {
            return messages.find({"messageGuest": messageGuest, "sheetId": sheetId});
          });
          
          Meteor.publish("rabbit", function (sheetId) {
            return messages.find({"sheetId": sheetId});
          });
          
    


        Meteor.methods({
          insertMessage: function(sheetId, senderId, messageGuest, isOwner,  msg){
            messageTime = new Date()
            messages.insert({"sheetId": sheetId, "senderId": senderId,  "messageGuest": messageGuest, "isOwner": isOwner, "messageContent": msg, "messageTime": messageTime, "unRead": 1})
          
            
          }, 
          markAsRead: function(id){
            messages.update({_id: id}, {$set: {unRead: 0}} )
          }
        
        
        })
        





}
