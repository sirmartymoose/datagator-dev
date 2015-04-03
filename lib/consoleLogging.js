if (Meteor.isClient) {
      
      cLogging = true
      
      cLog = function(message){
            if(cLogging == true){
                  console.log("cLog: " + message)
            }
      }
      

      
      
      
}