// Last Refactored March 31st
if (Meteor.isClient) {
  
  Accounts.onLogin(function(){
    dcLogin()      
  })
  
  
  if(Meteor.user() == null){
    dcReRoute()
  }


} // End is Client