if (Meteor.isClient) {

    Template.welcome.rendered = function () {
      
        if(Meteor.user() !== null) {



            //console.log(myOwnedSheets)

            $(document).ready(function() {
                console.log("Doc ready welcome rendered")
                myOwnedSheets = client_getUserSheetsWelcomePage()
                console.log("myOwnedSheetsDefined")
                showOwnedSheets(getUserSheetReferenceData(myOwnedSheets), "#sheetsYouOwn_results")
            
                
    function showSheets(res){
        htmlResults = ""
      
        $(res).each(function(x,y){
            
            
            sheetName = y['title']
            submitted = y['submitted']
            myUserId = y['_id']
            sheetURL = "/sharedSheets/" + myUserId

            resultString = "<li class='list-group-item'>"+
    				"<div class='row'>"+
    					"<div class='col-md-4' >"+ 
    						"<div class='list-group-item-heading'>"+
    							"<h4><a href='" + sheetURL  + "'> "+ sheetName +"</a></h4>"+
    						"</div>"+
    					"</div> "+
    					"<div class='col-md-4'>"+
    					"	<div class='list-group-item-heading'>"+
    					"		<h4>Saved</h4> "+
    						"</div>"+
    					"</div>"+
    				"</div>"+
    				"<div class='row'>"+
    					"<div class='col-md-4' > "+
    							
    						
    					"</div> "+
    					"<div class='col-md-2'>"+
    					"		Status "+
    					"</div>"+
    				"</div>"+
    			"</li>"
          htmlResults = htmlResults + resultString
        })
        return htmlResults
    }
                
    Meteor.call('listWelcomeSharedSheets', Meteor.user().emails[0].address, function (error, result) {
      if (error) {
        "ERROR"
      } else {
          if (result.length > 0){
                    //$("#results").append(result[0]['sheetOwnerEmail'])
                    $("#sheetsYouShare_results").append(showSheets(result))
            
          } else {
                  $("#sheetsYouShare_results").append('<h3> No Sheets shared with you yet </h3>')
                  
            
          }
        
      }
  });            
                
                
                
                
                
            })


        }
      
    }

}