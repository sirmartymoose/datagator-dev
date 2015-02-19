
    Template.listOwnedSheets.rendered = function () {
      sheetDefinitions = sheetDefinitions.find().fetch() 
      sheetHistory = sheetHistory.find().fetch() 
    }




if (Meteor.isClient) {
  
  function logEvent(msg, content){
      console.log(msg +" : " + content)
      
  }

  Template.listOwnedSheets.rendered = function () {
        console.log("LIST OWNEDSHEETS CALLED")
                  var listOwnedSheets_userId = Meteor.userId()
                  console.log("listOwnedSheets_userId: " + listOwnedSheets_userId)
                  
                  if (typeof Meteor.user() !== 'undefined') {
                        listOwnedSheets_userEmail = Meteor.user().emails[0].address
                   }
                  

        $(document).ready(function(){
            final_output_array = []
        
        // Create an empty array called ownedSheetResults 
        // Get the User ID and email* (PASS) 
        // Get the Sheet Definitions for sheets that the user owns*  (PASS) 
        // For each sheet create an object (sheetObj) and store: 
            // sheetObj['createdTime'] (input: date time) Created (March 6) (sd.submitted)* (PASS) 
            // sheetObj['sharedFlag'] (input: 0 or 1) Whether it is shared (if sd.sharedEmail array > 0)* (PASS)
            // sheetObj['numSharedGuests'] (input: integer) The number of contributors in the shared Email Array (numShared)* (PASS)
        // Add each object to ownedSheetResults array * (PASS)
            
            
        // for each object in ownedSheetResults array 
            // if sheetObj['sharedFlag'] === 1
                // FOR EACH: Get the sheetHistory sh for the sheet id (sheetId)* (PASS)
                //NOTE: Save the array explicitly because you are going to be using a lot of actions
                    // Get Shared time SHared (March 8) (sh.event = "Shared") (sh.time)* (PASS w/ Conditions - Not ordered)
                        // Assign sheetObj['sharedTime']*
                    // Get the number unique guest saved email addresses.  Number Contributions (sh.event = "guestSaved") (sh.time) (unique sh.userEmail)*
                        // Assign sheetObj['numSavedContributors'] to the count*
                    // Create an Array of unique emails for later use*
                        // Assign sheetObj['savedContributorEmails'] to the array *
                    // Get number pending (sheetObj['numSharedGuests'] - sheetObj['numSavedContributors']  )*
                        // Assign sheetObj['numPendingContributors'] to the count*
                    // Get the last time the ownerloaded the sheet (sh.event = "ownerLoaded")*
                        // Assign sheetObj['ownerLastLoaded'] to the time *
                    // Get the number of unique users that have guestSaved since sheetObj['ownerLastLoaded'] *
                        // Assign sheetObj['updateCount'] (input: integer)*
                    // Render the results on the screen *
                        
                        
                        
              // Create an empty array called ownedSheetResults                
                  ownedSheetResults = []
                  
              // Get the User ID and email*

                  
                  //console.log(listOwnedSheets_userId + listOwnedSheets_userEmail)
                  
              // Get the Sheet Definitions for sheets that the user owns* 
                  var listOwnedSheets_sheetDefinitions = sheetDefinitions.find({userId: listOwnedSheets_userId}).fetch()
                  logEvent('listownedsheets_sheetdefinitions', listOwnedSheets_sheetDefinitions)
                  //console.log(listOwnedSheets_sheetDefinitions)
              
 
              // For each sheet create an object (sheetObj) and store: 
              
                  $(listOwnedSheets_sheetDefinitions).each(function(x,y){
                    
                        var sheetObj = {}
                        
                        // Add the sheetObj sheetId
                        
                            sheetObj['sheetId'] = y['_id']
                            sheetObj['sheetTitle'] = y['title']
                        
                        // sheetObj['createdTime'] (input: date time) Created (March 6) (sd.submitted)*
              
                            sheetObj['createdTime'] = y['submitted']
                          
                        
                        // sheetObj['sharedFlag'] (input: 0 or 1) Whether it is shared (if sd.sharedEmail array > 0)*
                        // sheetObj['numSharedGuests'] (input: integer) The number of contributors in the shared Email Array (numShared)*
                        
                        
                            if (typeof y['sharedEmails'] !== 'undefined') {
                            var sheetNumShares = y['sharedEmails'].length; 
                        

                              
                                sheetObj['sharedFlag'] = 1
                                sheetObj['numSharedGuests'] = sheetNumShares
                              
                            
                            
                            }else {
                              
                                sheetObj['sharedFlag'] = 0
                                sheetObj['numSharedGuests'] = 0
                            }
                            

                  // Add each object to ownedSheetResults array * 
                        ownedSheetResults.push(sheetObj)
                        
                  })
                  
                  
                console.log(ownedSheetResults)
                
                $(ownedSheetResults).each(function(c,d){
                    console.log(d)
                    newObject = d
                    
                    var histResult = sheetHistory.find({sheetId: d['sheetId']}).fetch()
                    
                    //console.log(histResult)
                    
                    // Get Shared time SHared (March 8) (sh.event = "Shared") (sh.time)*
                    if(d['sharedFlag'] == 1){
                            sharedDateObj = _.where(histResult, {event: "Shared"})
                    
                    out_sharedTime = sharedDateObj[0]['time']
                            
                    
                    // Get the number unique guest saved email addresses.  Number Contributions (sh.event = "guestSaved") (sh.time) (unique sh.userEmail)*
                            savedEventArray = _.where(histResult, {event: "guestSaved"})
                            console.log(savedEventArray)
                            uniqueUserArray = []
                            $(savedEventArray).each(function(f,g){
                                uniqueUserArray.push(g['userEmail'])
                            })
                            


                            uniqueSavedContributors = _.uniq(uniqueUserArray)
                            
                            // Create an Array of unique emails for later use*
                            
                    out_uniqueSavedContributors = uniqueSavedContributors
                            //console.log(uniqueSavedContributors)
                            //console.log(savedEventArray)
                    out_uniqueSavedCount = uniqueSavedContributors.length 
                            
                            // Get number pending (sheetObj['numSharedGuests'] - sheetObj['numSavedContributors']  )*
                    out_pendingGuestCount = d['numSharedGuests'] - out_uniqueSavedCount 
                            
                            //console.log(out_pendingGuestCount)
                            //console.log(out_sharedTime)
                    
                    out_obj = {sheetId: d['sheetId'], createdTime: d['createdTime'],  sheetTitle: d['sheetTitle'], sharedFlag: d['sharedFlag'],  uniqeSavedCount: out_uniqueSavedCount, pendingGuestCount: out_pendingGuestCount, uniqueSavedContributors: out_uniqueSavedContributors, sharedTime: out_sharedTime }
                    final_output_array.push(out_obj)
                    } else {
                        
                     slim_obj = {sheetId: d['sheetId'], createdTime: d['createdTime'],  sheetTitle: d['sheetTitle'], sharedFlag: d['sharedFlag']}   
                     final_output_array.push(slim_obj)
                        
                        
                    }
                    
                })
                
     

                    function showSheet(sheetURL, sheetName, createdTime, shared, sharedTime, uniqueSaved, pendingGuest){
                            
                    resultString = "<li class='list-group-item'>"+
    				"<div class='row'>"+
    					"<div class='col-md-4' >"+ 
    						"<div class='list-group-item-heading'>"+
    							"<h4><a href='" + sheetURL  + "'> "+ sheetName +"</a></h4>"+
    						"</div>"+
    					"</div> "+
    					"<div class='col-md-4'>"+
    					"	<div class='list-group-item-heading'>"+
    					"		<h4>"+ shared + " </h4> "+
    						"</div>"+
    					"</div>"+
    					"<div class='col-md-3'><h4>"+uniqueSaved+" </div>" +
    				"</div>"+
    				"<div class='row'>"+
    					"<div class='col-md-4' > "+
    							"Created: " + createdTime +
    						
    					"</div> "+
    					"<div class='col-md-4'>"+
    					"		" + sharedTime +" "+
    					"</div>"+
    					    					"<div class='col-md-3'> "+pendingGuest+ "</div>" +

    				"</div>"+
    			"</li>"
    			
    			return resultString
                    }          
        
        
        
        
            $(final_output_array).each(function(x,y){
                sheetURI = "/posts/"  + y['sheetId']
                showTime = typeof(y['createdTime'])
                showTimeFull = y['createdTime']
            
                
                if (y['sharedFlag'] == 1){
                    shareValue = "Shared"
                    shareTimeString = y['sharedTime'].getMonth() + 1 + "/" + y['sharedTime'].getDate()
                    shareTime = shareTimeString
                    uniqueSaved = y['uniqeSavedCount'] + " Contribution"
                    pendingGuest = y['pendingGuestCount'] + " Pending"
                    
                }else{
                    
                    shareValue = "not Shared"
                    shareTime = ""
                    uniqueSaved = ""
                    pendingGuest = ""
                }
                
                
                showTimeFullString = showTimeFull.getMonth() + 1 + "/" + showTimeFull.getDate()
                
                $("#results").append(showSheet(sheetURI, y['sheetTitle'], showTimeFullString,  shareValue, shareTime, uniqueSaved, pendingGuest))
                
            })        
        
        
        }) 
  

  }
  
  
}