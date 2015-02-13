


if (Meteor.isClient) {
  

  Template.admin_sheetHistory.rendered = function () {
        
        $(document).ready(function(){
              console.log("admin_sheetHistory.js doc ready called")
              
              
              $("#getActionsButton").click(function(){
                    console.log("CLICKED")
                    var actionSheetId = $("#sheetIdInput").val()
                    var myData = sheetHistory_getHistory(actionSheetId)
                    $(myData).each(function(x,y){
                         $("#results").append("<br>" + y ) 
                          
                    })
                     
                    
              })
             
              
              
              
             

              
              
        })
   console.log("HI")     
  
        
        
        
  }
}