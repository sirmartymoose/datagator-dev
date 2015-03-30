if (Meteor.isClient) {
  


  Template.listOwnedSheets.rendered = function () {



    $(document).ready(function(){


                  

     

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




        showOwnedSheets = function(){
            var sheetRefData = getUserSheetReferenceData(getUserSheetDefinitions())
            $(sheetRefData).each(function(x,y){
                console.log("show owned sheets function called")
                console.log(y)
                var ownedSheetResult = showSheet("posts/" + y['sheetId'], y['sheetName'], y['createdDate'], y['sheetStatus'], 'time', y['numContributed'], y['numPending'])
                $("#results").append(ownedSheetResult)
            })

        }
        
        

        showOwnedSheets()
        
        }) 
  

  }
  
  
}