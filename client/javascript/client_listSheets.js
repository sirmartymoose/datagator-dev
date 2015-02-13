if (Meteor.isClient) {

  userId = (Meteor.userId())
  console.log(userId)
  Template.listSheets.rendered = function () {


   





$(document).ready(function(){
  
       
  
    function showSheets(res){
      htmlResults = ""
      
        $(res).each(function(x,y){
            
            
            sheetName = y['title']
            submitted = y['submitted']
            myUserId = y['_id']
            sheetURL = "/posts/" + myUserId

            resultString = "<li class='list-group-item'>"+
    				"<div class='row'>"+
    					"<div class='col-md-4' >"+ 
    						"<div class='list-group-item-heading'>"+
    							"<h4><a href='" + sheetURL  + "'> "+ sheetName +"</a></h4>"+
    						"</div>"+
    					"</div> "+
    					"<div class='col-md-4'>"+
    					"	<div class='list-group-item-heading'>"+
    					"		<h4>Shared</h4> "+
    						"</div>"+
    					"</div>"+
    					"<div class='col-md-3'><h4>6 contributions<span class='badge' id='listsheetsbadge' data-toggle='tooltip' data-placement='top' title='Tooltip on top'>+4</span></h4> </div>" +
    				"</div>"+
    				"<div class='row'>"+
    					"<div class='col-md-4' > "+
    							"Created: Mar 4th, 2015" +
    						
    					"</div> "+
    					"<div class='col-md-4'>"+
    					"		March 15, 2015 "+
    					"</div>"+
    					    					"<div class='col-md-3'>4 Pending </div>" +

    				"</div>"+
    			"</li>"
          
        
          htmlResults = htmlResults + resultString
        })
        
        
        
        return htmlResults
    }
    
    console.log("I AM DOC READY")
    
      Meteor.call('listSheets', userId, function (error, result) {
      if (error) {
        "ERROR"
      } else {
        
          if (result.length > 0){
                    $("#results").append(result[0]['sheetOwnerEmail'])
                    $("#results").append(showSheets(result))
            
          } else {
                  $("#results").append('<h3> No Sheets Created Yet </h3>')
                  
            
          }
        
        

        
      }
  });
     
     
     
        
})









  }



}

