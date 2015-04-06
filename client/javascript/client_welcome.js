if (Meteor.isClient) {

    Template.welcome.rendered = function () {
        


        Meteor.subscribe("guestSheetDefinitions", Meteor.user()['emails'][0]['address']);
        Meteor.subscribe("guestSheetData", Meteor.user()['emails'][0]['address']);
        Meteor.subscribe("ownerSheetDefinitions");
        Meteor.subscribe("ownerSheetData");



        if(Meteor.user() !== null) {





            $(document).ready(function() {

            
                
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
                
    function welcomeShowOwnedSheets(res){
        htmlResults = ""
        var miniArray = getUserSheetReferenceData(res)
        $(miniArray).each(function (x, y) {
            var ownedSheetResult = showSheet("posts/" + y['sheetId'], y['sheetName'], y['createdDate'], y['sheetStatus'], '', y['numContributed'], y['numPending'])
            htmlResults = htmlResults + ownedSheetResult
        })

        return htmlResults
    }
                
                
    Meteor.call('listWelcomeSharedSheets', Meteor.user().emails[0].address, function (error, result) {
      if (error) {
        "ERROR"
      } else {
          if (result.length > 0){

                    $("#sheetsYouShare_results").append(showSheets(result))
            
          } else {
                  $("#sheetsYouShare_results").append('<p id="welcomeEmptyText"> No Sheets shared with you yet </p>')
                  
            
          }
        
      }
  });        
  
  
      Meteor.call('listWelcomeOwnedSheets',  function (error, result) {
      if (error) {
        "ERROR"
      } else {
          if (result.length > 0){
                    $("#sheetsYouOwn_results").append(welcomeShowOwnedSheets(result))
            
          } else {
                  $("#sheetsYouOwn_results").append('<p id="welcomeEmptyText"> You havent shared any sheets yet </p>')
                  
            
          }
        
      }
  });
                
                
                
                
                
            })


        }
      
    }

}
