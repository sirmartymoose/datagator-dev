if (Meteor.isClient) {
      
      cLogging = true
      cLoggingConsole = true
      cLoggingDatabase = false
      
      cLog = function(message){
            if(cLogging == true){
                  if(Meteor.userId() != null){
                        var logObject = {}
                        var d = new Date();
                        var url = window.location.href
                        var userId = Meteor.userId()
                        var msg = message

                        logObject['logDate'] = d; 
                        logObject['url'] = url; 
                        logObject['userId'] = userId
                        logObject['message'] = msg
                        
                        var logString = JSON.stringify(logObject)
                        if(cLoggingDatabase == true){
                              Meteor.call('cLogEvent', logObject, function(err,res){
                                 //console.log(res)
                              })
                        }
                        
                        if(cLoggingConsole == true){
                              console.log(logString)
                        }
                        //systemLogs.insert(logString)
                  } else {
                        if(cLoggingConsole == true){
                              console.log("cLog: UserId: " + "null" + " :" + message)
                        }
                  }
            }
      }
      
      
      debug_showDatabaseLog = function(){
            
            Meteor.call('cShowLog', function(x,y){
                  
                  $(y).each(function(z,a){
                        
                       console.log(JSON.stringify(a)) 
                  })
                  
                  
            })
      }
      
}

if (Meteor.isServer) {
 
        Meteor.methods({
            cLogEvent: function(logObject){
                  systemLogs.insert(logObject)
            }, 
            
            cShowLog: function(){
                  var result = systemLogs.find().fetch()
                  return result
                  
            }
       
         })
      
}