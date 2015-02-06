
if (Meteor.isClient) {
  

  Template.viewSheet.rendered = function () {
    
          function logEvent(ActionTemplate, ActionMessage, ActionSheetId){
          actionUserId = Meteor.userId() 
          var currentDate = new Date(); 
          logEvent = {actionDate: currentDate, actionUserId: actionUserId, actionSheetId: ActionSheetId,  actionTemplate: ActionTemplate, actionMessage: ActionMessage }
          userActions.insert(logEvent)
          
      }
    
      logEvent('viewSheet', 'Rendered: viewSheet.js', Session.get("mySheetId"))
      
    

    
    
      thisSheetId = Session.get('mySheetId')
          mySheetId = Session.get("mySheetId")
    console.log(mySheetId)
    
    sheetId = mySheetId;

    sheetOwnerAuthor = "sirmartymoosez"
    
    //myid = this.params._id
    

    
 Sheets = sheetDefinitions.findOne({_id: sheetId})
    
    
  

    
   // console.log(Sheets)
 
 
 
 
 //console.log(getHot_dataSchema())
 
 //console.log(getHot_colHeaders(true))
 //console.log(getHot_columns(true))
 
 
 //Start  Share Functions
 
    function addSharedEmails(){
      
      sharedEmailArray = []
      
      
      $(".form-group").each(function(){
        var emailValue = $(this).find("#emailAddress").val()
        sharedEmailArray.push(emailValue)
        
        
        
      })
      
      sharedEmails = {sharedEmails: sharedEmailArray}
      sheetDefinitions.update({_id: Session.get('mySheetId')}, {$set: sharedEmails})
      return sharedEmailArray
      
      
    }
    
    
    function getSharedEmails(){
      shareResult = sheetDefinitions.find({_id: Session.get('mySheetId') }, {fields: {sharedEmails: 1}}).fetch()
      return shareResult
      
     
   
      
    }
    
    function populateShareForm(){
  

      $("#shareSheetForm").html("")
      var myShares = getSharedEmails()
       $(myShares[0]['sharedEmails']).each(function(x,y){
            formString = "<div class='form-group'><label for='shareEmail'>Share with</label><input type='email' class='form-control shareEmailAddress' disabled id='emailAddress' placeholder='"+ y + "' value = '"+y+ " ' ></div>"
            $("#shareSheetForm").append(formString)
         
       })

        var inputString = "<div class='form-group'><label for='shareEmail'>Share with</label><input type='email' class='form-control shareEmailAddress' id='emailAddress' placeholder='Enter Email Adress'></div>"
         $("#shareSheetForm").append(inputString)
      
    }
 
 
 // End Share Functions
 
      
      
    $(document).ready(function(){
      
      $("#shareSheet").click(function(){
      populateShareForm()
      })
      
      $("#addFormEmail").click(function(){
            var inputString = "<div class='form-group'><label for='shareEmail'>Share with</label><input type='email' class='form-control shareEmailAddress' id='emailAddress' placeholder='Enter Email Adress'></div>"
            $("#shareSheetForm").append(inputString)
      })
      
      
      
      //getSharedEmails()
             $("#submitShareForm").click(function(){
               
               console.log(addSharedEmails())
               console.log(getSharedEmails())
            })
      
      $("#sheetName").click(function(){
        $("#leftNav").toggle()
        
      })
      
      $("#sheetNameValue").html(getSheetTitle())
      
      yellowRenderer = function(instance, td, row, col, prop, value, cellProperties) {
       Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = "#ececec";

};

      
      

        console.log("VIEWSHEETLOADED")
        //console.log(_id)
        //console.log(thisSheetId)
        myData = sheetDefinitions.findOne({_id: thisSheetId})
        console.log(myData)
        $("#results").append(myData['title'])
        
                    function getData() {
                      resultArray = []
                      loadData = sheetData.find({sheetId: sheetId}).fetch()
                      
                      $(loadData).each(function(x,y){
                        resultArray.push(y)
                      
                      })
                      
                      return resultArray
        
                    }
// Instead of creating a new Handsontable instance with the container element passed as an argument,
// you can simply call .handsontable method on a jQuery DOM object.
    var $container = $("#HOT");

    
 $container.handsontable({
  data: getData(),
  colHeaders: getHot_colHeaders(true),
  colWidths: getHot_colWidths(true), 
  dataSchema: getHot_dataSchema(),
  columns: getHot_columns(true),
  minSpareRows: 1

});

// This way, you can access Handsontable api methods by passing their names as an argument, e.g.:
hotInstance = $("#HOT").handsontable('getInstance');

$("#saveSheet").click(function(){
  lineIterator = 0 
  saveData = $("#HOT").handsontable('getData');
  numLines = saveData.length
  $(saveData).each(function(x,y){
      //sheetData.insert(y)
      dataId = y['_id']
      
      if(lineIterator < numLines - 1){
        sheetData.update({_id: dataId},y,{ upsert: true })
        lineIterator = lineIterator + 1;
      }
      
      
    
  })
  
  
})


        
    }); 
  
  }
  
}