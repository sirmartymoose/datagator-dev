updateCursor = function(sheetId, messageGuest){
      Meteor.subscribe("messages", sheetId, messageGuest);
  }
  

updateChat = function(sheetId, messageGuest){
      clearChats()
      Meteor.subscribe("messages", sheetId, messageGuest);
      messageCursor = messages.find({"sheetId": sheetId, "messageGuest": messageGuest})
      var handle = messageCursor.observe({
      added: function (post) {displayMessageFromObject(post); updateChatScroll(); console.log("ADDED")  } 
});

}


displayMessageFromObject = function(obj){
   var msgSenderId = obj['senderId']
   var isMatch = Match.test(msgSenderId, senderId)
   if(isMatch == true){
      displayMessage(1, obj['messageContent'])
  } else {
    displayMessage(0, obj['messageContent'])
    
  }
}
        
        
  displayMessage = function(isCurrentUser, msg){
    if(isCurrentUser == 1){
      var m = snippet_currentUserMessage(msg)
    } else {
      var m = snippet_otherUserMessage(msg)
    }
    $("#chatContentRowText").append(m)
  }
  
  
  displayUserList = function(userArray){
    $("#cPanelList").html("")
    $(userArray).each(function(x,y){
      var m = snippet_listUser(y)
      $("#cPanelList").append(m)
      
    })
    
  }
  
  
      snippet_currentUserMessage = function(msg){
            var snip = "<li class='list-group-item messageLeft'><b>You: </b>" + msg + "</li>"
            return snip
        }
        
        snippet_otherUserMessage = function(msg){
                        var snip = "<li class='list-group-item messageRight'><b>Guest: </b>" + msg + "</li>"

            return snip
        }
        
        snippet_listUser = function(usr){
            userReplace = usr.replace(/@.*/, "")
            var snip = "<li class='list-group-item listedUser'><p>" + usr + "</p><div class='badge' id='" + userReplace + "'></div></li>"
            return snip
        
        }
        
        
        updateChatScroll = function(){
          var elem = document.getElementById('chatContentRowText');
         elem.scrollTop = elem.scrollHeight;
          
        }
        
      clearChatContent = function(){
        $("#chatContentRowText").hide()
        $("#chatActionsRow").hide()
        
      }
      
      showChatContent = function(){
        $("#chatContentRowText").show()
        $("#chatActionsRow").show()
        
      }

      showcPanelList = function(){
        $("#cPanelList").show()
        
      }
      
      
      hidecPanelList = function(){
        $("#cPanelList").hide()
        
      }
      
      
      showChat = function(){
        $("#cPanelList").hide()
        $("#chatContentRowText").show()
        $("#chatActionsRow").show()
        $("#chatPanelHeading").html("Back to List")
        $("#chatPanelHeading").click(function(){
          showList()
        })
        
      }
      
      
      showList = function(){
        $("#cPanelList").show()
        $("#chatContentRowText").hide()
        $("#chatActionsRow").hide()
        $("#chatPanelHeading").html("Shared User List")
        displayUserList(userArray)
        testMessagesUpdate(sheetId)
      
                  $(".listedUser").on('click', function(){
              console.log("SUCCESS")
              var myVal = $(this).find("p").html()
              messageGuest = myVal
              updateChat(sheetId, myVal)
              showChat()
              markAsReadSelector(sheetId, 1, messageGuest)
          })
        
        
        
      }
      
      
      clearChats = function(){
        $("#chatContentRowText").html("")
        
      }
      
      
      getUnreadMessagesByUser = function(sheetId){
        var outputArray = []
        testArray = messages.find({sheetId: sheetId, unRead: 1, isOwner: 0}).fetch()
        testPluck = _.pluck(testArray, 'messageGuest')
        var testPluckOut = _.reduce(testPluck, function(frequencies, value) {
                frequencies[value] = frequencies[value] && frequencies[value] + 1 || 1;
                
                return frequencies;
                //console.log(frequencies)
        }, {});
        return testPluckOut
        
      }
      
      
              testMessagesUpdate = function(sheetId){
          var unreadMsgObj = getUnreadMessagesByUser(sheetId)
          var convertObj = convertUnreadMessageObjectToArray(unreadMsgObj)
          displayUnreadMessageCount(convertObj)
        }
        
      
      
      convertUnreadMessageObjectToArray = function(msgObj){
          
          var outputArray = _.pairs(msgObj)
          return outputArray
          
        }
        
        
      displayUnreadMessageCount = function(userCountArray){
        $(userCountArray).each(function(x,y){
          var userEmail = y[0] 
          userReplace = userEmail.replace(/@.*/, "")
          var userEmailID = "#" + userReplace
          var msgCount = y[1]
          msgCount = msgCount.toString()
          $(userEmailID).html(msgCount)
          
        })
        
      }
      
      
      markAsReadSelector = function(sheetId, isOwner, messageGuest){
        if(isOwner == 1){
          myMini = messages.find({sheetId: sheetId, unRead: 1, isOwner: 0, messageGuest: messageGuest}).fetch()
          idArray = _.pluck(myMini, '_id')
          $(idArray).each(function(x,y){
            Meteor.call('markAsRead', y, function(err,res){console.log(err + res)})
          })
                        
          
        } else {
          
          myMini = messages.find({sheetId: sheetId, unRead: 1, isOwner: 1, messageGuest: messageGuest}).fetch()
          idArray = _.pluck(myMini, '_id')
          $(idArray).each(function(x,y){
            Meteor.call('markAsRead', y, function(err,res){console.log(err + res)})
          })
        }
        


        
        
        
      }