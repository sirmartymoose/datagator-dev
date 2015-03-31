if (Meteor.isClient) {
  


  Template.listOwnedSheets.rendered = function () {



    $(document).ready(function(){


                  

     


        
        

        showOwnedSheets(getUserSheetReferenceData(getUserSheetDefinitions()), "#results")
        
        }) 
  

  }
  
  
}