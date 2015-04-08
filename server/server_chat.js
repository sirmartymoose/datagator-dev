  
Meteor.startup(function () {





Meteor.methods({
      
      server_chat_insertMessageIntoDatabase: function (sheetId, isSheetOwner,  msgContent, messageRecipientId) {
            //Meteor.call('server_chat_insertMessageIntoDatabase', sheetId, 1,  "hi there", "r123", function(err, res){console.log(err + res)})
            var messageSenderId = this.userId
            var msgContent = msgContent
            var sheetId = sheetId
            var isSheetOwner = isSheetOwner
            var messageRecipientId = messageRecipientId
            var msgDate = new Date()
            var ownerUserId = sheetDefinitions.find({_id: sheetId}).fetch()
            ownerUserId = ownerUserId[0]['userId']
            
            var msgObject = {sheetId: sheetId, messageContent: msgContent, messageDate: msgDate}
            
            
            
            if(isSheetOwner == 1){
                  // Retrieve all messages sent by me 
                  msgObject['sentFrom'] = this.userId
                  msgObject['sentTo'] = messageRecipientId
                  
                  // Retrieve all messages sent by the specific sender to me
            } else {
                  
                  // Retrieve all message sent by me
                  // Retrieve all messages sent by teh owner to me
                  
                  msgObject['sentFrom'] = this.userId
                  msgObject['sentTo'] = ownerUserId
                  
            }


            chatHistory.insert(msgObject)
            
      }, server_chat_fetchMessageArray: function(sheetId, isOwner, convoWithUserId){
            
            //chatHistory.find({_id: "vHNZcinegWJJtehGb",  $or: [{sentTo: "r123"}, {sentFrom: "GS9GQ7zFMd3LHx9FZ"}]}).fetch()
            
            if(isOwner == 1){
                  // Retrieve all messages sent by me
                  var myMessages = chatHistory.find({sentFrom: this.userId, sheetId: sheetId}).fetch()
                  // Retrieve all messages sent by the specific sender to me
                  var yourMessages = chatHistory.find({sheetId: sheetId, sentFrom: convoWithUserId}).fetch()
            } else {
                  // Retrieve all message sent by me
                  var myMessages = chatHistory.find({sentFrom: this.userId, sheetId: sheetId}).fetch()
                  // Retrieve all messages sent by teh owner to me
                  var yourMessages = chatHistory.find({sentTo: this.userId, sheetId: sheetId}).fetch()
            }
            finalArray = []
            finalArray.concat(myMessages).concat(yourMessages)
            return finalArray
      }

      
})



  
  
  
  
})
   

    