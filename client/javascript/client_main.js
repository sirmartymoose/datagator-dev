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
    });

} // End is Client