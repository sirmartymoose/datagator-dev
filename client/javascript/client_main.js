
if (Meteor.isClient) {
  
  Accounts.onLogin(function(){
    console.log("HERE WE GO")
    console.log("AGAIN")
    dcLogin()      
  })
  

  Template.loginButtons.rendered = function () {
      
      console.log("CLIENT MAIN LOADED")
         
      $("#login-buttons-logout").click(function(){
            console.log("LOGOUT CLICKED")
            dcLogout()
      })
      
  }

}