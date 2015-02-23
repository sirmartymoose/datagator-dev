if (Meteor.isClient) {
  

  Template.chat.rendered = function () {
        

      

      
      
    $(document).ready(function(){
          var chatCurrentUserId = Meteor.userId()
          function createMessage(sheetId, userId, recipientId, message){
                chatHistory.insert({sheetId: sheetId, userId: userId, recipientId: recipientId, time: Date(), message: message})
          }
          
          
          function getAllMessages(){
            results = chatHistory.find().fetch()
            console.log(results)
          
          }
          
          
          function getUserMessages(chatUserId){
                var outputArray = []
                results = chatHistory.find({userId: chatUserId}).fetch()
                $(results).each(function(x,y){
                      console.log(y)
                      outputArray.push(y['message'])
                      
                })
                return results
                
          }
          
          function formatUserMessages(msg_array){
                var htmlString = ''
                $(msg_array).each(function(x,y){
                      htmlString = htmlString + '<li>' + y + '</li>'
                })
                
                return htmlString
                
          }
          
          
          function displayUserMessages(msg_html){
            $("#chatContent").append(msg_html)      
          }
          
          function displayCreateMessage(){
                
                $("#addChatButton").click(function(){
                      var chat_msg = $("#addChatText").val()
                      createMessage("123", Meteor.userId(), "def", chat_msg)
                      $("#chatContent").append(chat_msg)      
                      
                })
          }
          
          
          
          console.log(getUserMessages(Meteor.userId()))
          console.log(getAllMessages())
          //createMessage("123", chatUserId, "def", "HI there")
          
          var get_msg = getUserMessages(Meteor.userId())
          var format_msg = formatUserMessages(get_msg)
          displayUserMessages(format_msg)
          
      

      
          
    })
    
  }
}