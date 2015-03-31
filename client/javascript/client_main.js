
if (Meteor.isClient) {
  
  Accounts.onLogin(function(){
    dcLogin()      
  })
  
  
  if(Meteor.user() == null){
    dcReRoute()
  }

  

  Template.loginButtons.rendered = function () {
      
         
      $("#login-buttons-logout").click(function(){
            dcLogout()
      })
      
  }

}