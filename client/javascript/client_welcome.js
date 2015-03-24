if (Meteor.isClient) {
  

  Template.welcome.rendered = function () {
      
 if(Meteor.user() !== null){
       
       

      
    $(document).ready(function(){
          
          $(function () {
  $('[data-toggle="tooltip"]').tooltip()
            })
          

                
      
        function welcome_getOwnedSheets(){
            console.log("getOwnedSheets Called")
          
          results = sheetDefinitions.find({userId: Meteor.userId()}, {limit:2}).fetch()
          return results
          
      }
      
        function welcome_showOwnedSheets(){
            console.log("showOwnedSheets Called")
            

 
            
            result_string = ""
            results = welcome_getOwnedSheets()
            $(results).each(function(x,y){
                            sheetName = y['title']
                             submitted = y['submitted']
                             myUserId = y['_id']
                            sheetURL = "/posts/" + myUserId
                            theString = "<li class='list-group-item'>"+
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
                
                
                result_string = result_string + theString
                
                
                
                
            })
            
            return result_string   
            
        }
        
        function welcome_getSharedSheets(){
            console.log("getSharedSheets Called")
          
          results = sheetDefinitions.find( { sharedEmails: Meteor.user().emails[0].address}, {limit: 2} ).fetch()
          
          return results
          
      }
        
                function welcome_showSharedSheets(){
            console.log("showOwnedSheets Called")
            

 
            
            result_string = ""
            results = welcome_getSharedSheets()
            $(results).each(function(x,y){
                            sheetName = y['title']
                             submitted = y['submitted']
                             myUserId = y['_id']
                            sheetURL = "/sharedSheets/" + myUserId
                            theString = "<li class='list-group-item'>"+
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
                
                
                result_string = result_string + theString
                
                
                
                
            })
            
            return result_string   
            
        }
          
          console.log("welcome rendered and document ready")
          
          $("#sheetsYouOwn_results").append(welcome_showOwnedSheets())
           $("#sheetsYouShare_results").append(welcome_showSharedSheets())
        
          
          
          
      })
}
      
  }

}