// Last Refactored March 31st
if (Meteor.isClient) {
  
  Accounts.onLogin(function(){
    dcLogin()      
  })
  
  
  if(Meteor.user() == null){
    dcReRoute()
  }





    $(document).ready(function() {
        cLog("Client Main Doc Ready Loaded")
        
          confirmEmailRemove = function(){
            cLog("CONFIRM EMAIL REMOVE CALLED")
            confirmSnippet = '<div class="alert alert-success" role="alert"> Email Address has been added to the Block list. You will not receive any emails</div>'
            $("#mainAlertText").html(confirmSnippet)
            
          }
        
        $("#submitUnsubscribe").click(function(){
          Meteor.call("addBlockedEmail", $("#blockEmail").val().toLowerCase(), function(err,res){console.log(res)})
          confirmEmailRemove()
        })
        

        
        
    });

} // End is Client