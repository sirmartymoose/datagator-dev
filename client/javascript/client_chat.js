
Template.messages.helpers({
    messages: function() {
        return chatHistory.find({});
    }
})
  


Template.chat.rendered = function () {

      $(document).ready(function(){
            
            /// Begin Trash Test Data ////
            
            testData_sheetId = "msh5iw9rLBxoLDNpp"
            testData_senderId = "123"
            testData_recipientId = "456"
            
            
            //// End Trash test Data /////
            
            chat_getMessageText = function(){
                  var messageText = $("#messageContentText").val()
                  return messageText
            }
            
            chat_clearMessageText = function(){
                  $("#messageContentText").val("")
            }
            
            chat_showSentMessageInInterface = function(msgContent){
                  $("#chatContentMessageSpace").append('<div class="row"><div class="col-md-12" ><div class="messageOutgoing"> ' + msgContent + '</div></div></div>')
            }
            
            chat_showHistoricalSentMessageInInterface = function(msgContent){
                  $("#chatContentMessageSpace").append('<div class="row"><div class="col-md-12" ><div class="messageOutgoing"> ' + msgContent + '</div></div></div>')
            }
            
            chat_showHistoricalReceivedMessageInInterface = function(msgContent){
                  $("#chatContentMessageSpace").append('<div class="row"><div class="col-md-12" ><div class="messageIncoming"> ' + msgContent + '</div></div></div>')
            }
            
            chat_insertMessageIntoDatabase = function(sheetId, msgContent){
                  // (sheetId, isSheetOwner,  msgContent, messageRecipientId)
                  var isSheetOwner = 1
                  var msgRecipientId = testData_recipientId
                  Meteor.call('server_chat_insertMessageIntoDatabase', testData_sheetId, isSheetOwner, msgContent, msgRecipientId)
            }
            
            
            // Send the Message 
            
            $("#messageSendButton").click(function(){
                  msgContent = chat_getMessageText()
                  chat_showSentMessageInInterface(msgContent)
                  chat_clearMessageText()
                  chat_insertMessageIntoDatabase(testData_sheetId, msgContent)
                  
            })
            
            
            
            
      })


}
