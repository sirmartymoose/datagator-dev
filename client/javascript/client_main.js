
if (Meteor.isClient) {
  
  Accounts.onLogin(function(){
    dcLogin()      
  })
  
  
  if(Meteor.user() == null){
    dcReRoute()
  }

  

  Template.loginButtons.rendered = function () {
      
      console.log("CLIENT MAIN LOADED")
         
      $("#login-buttons-logout").click(function(){
            console.log("LOGOUT CLICKED")
            dcLogout()
      })
      
  }

}