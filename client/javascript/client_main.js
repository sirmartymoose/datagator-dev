
if (Meteor.isClient) {
  

  Template.loginButtons.rendered = function () {
      
      console.log("CLIENT MAIN LOADED")
         
      $("#login-buttons-logout").click(function(){
            console.log("LOGOUT CLICKED")
            dcLogout()
      })
      
  }

}