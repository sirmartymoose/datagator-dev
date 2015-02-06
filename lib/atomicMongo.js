if (Meteor.isClient) {
      
      
       onlyUnique = function(value, index, self) { 
          return self.indexOf(value) === index;
      }
      
      sheetEvent = function(sheetId, event){
            var time = new Date()
            var sheetId = sheetId
            userEmail = Meteor.user().emails[0].address
            
            var userId = Meteor.userId()
            var event = event
      
            sheetHistory.insert({sheetId: sheetId, time: time, userEmail: userEmail, userId: userId, event: event})
            

      }
      
      
      sheetHistory_getCreatedDate = function(sheetId){
            resultArray = []
            var result = sheetHistory.find({sheetId: sheetId },  {fields: {time: 1}} ).fetch()
            $(result).each(function(x,y){
                  resultArray.push(y['time'])
            })
            resultSorted = resultArray.sort(function(a,b){return a.getTime()  - b.getTime() });
            return resultSorted[0]
      }
      
      sheetHistory_getHistory = function(sheetId){
            var resultArray = []
            var result = sheetHistory.find({sheetId: sheetId}).fetch()
            
            $(result).each(function(x,y){
                  eachArray = []
                  resTime = y['time']
                  resSheetId = y['sheetId']
                  resEvent = y['event']
                  resUserEmail = y['userEmail']
                  resUserId = y['userId']
                  eachArray.push(resTime)
                  eachArray.push(resSheetId)
                  eachArray.push(resEvent)
                  eachArray.push(resUserEmail)
                  eachArray.push(resUserId)
                  resultArray.push(eachArray)
                  
            })
            
            resultArray = resultArray.sort(function(a,b){return   b[0].getTime() - a[0].getTime()   });
            return resultArray


      }
  
      sheetHistory_getNumberUpdatedUsers = function(sheetId){
            workingArray = []
            var myHistory = sheetHistory_getHistory(sheetId)
            $(myHistory).each(function(x,y){
                  workingArray.push(y[3])
            })
            
            FinalResultArray = workingArray.filter(onlyUnique)
            return FinalResultArray
            
      }    
      
      
      
      
}