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
    					"		<h4>Saved</h4> "+
    						"</div>"+
    					"</div>"+
    				"</div>"+
    				"<div class='row'>"+
    					"<div class='col-md-4' > "+
    							"<h4> hello </h4>" +
    						
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

