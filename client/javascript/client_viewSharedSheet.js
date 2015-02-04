
if (Meteor.isClient) {
  

  Template.viewSharedSheet.rendered = function () {
    
          function logEvent(ActionTemplate, ActionMessage, ActionSheetId){
          actionUserId = Meteor.userId() 
          var currentDate = new Date(); 
          logEvent = {actionDate: currentDate, actionUserId: actionUserId, actionSheetId: ActionSheetId,  actionTemplate: ActionTemplate, actionMessage: ActionMessage }
          userActions.insert(logEvent)
          
      }
    
      logEvent('viewSharedSheet', 'Rendered: viewSharedSheet.js', Session.get("mySheetId"))
      
    

    
    
      thisSheetId = Session.get('mySheetId')
          mySheetId = Session.get("mySheetId")
    console.log(mySheetId)
    
    sheetId = mySheetId;

    sheetOwnerAuthor = Session.get("userEmail")
    
    //myid = this.params._id
    
console.log(sheetOwnerAuthor)
    
 Sheets = sheetDefinitions.findOne({_id: sheetId})
    
    
  function sheetErrorCheck(variable) {
          if(typeof variable === 'undefined'){
             return true
         };
    
    }

  function getSheetTitle(){
    title = Sheets.title; 
    if(sheetErrorCheck(title) === true) {return Error( "No Sheet Name in Mongo")}; 
    return title; 
  }
  
function getSheet_id(){
    sheetId = Sheets._id
    if(sheetErrorCheck(sheetId) === true) {return Error( "No sheetId in Mongo")}; 
    return sheetId; 
  }
  
function getSheetOwnerAuthor(){
    sheetOwnerAuthor = Sheets.author; 
    if(sheetErrorCheck(sheetOwnerAuthor) === true) {return Error( "No sheetOwnerAuthor in Mongo")}; 
    return sheetOwnerAuthor; 
  }

function getSheetSubmitted(){
    sheetSubmitted = Sheets.submitted; 
    if(sheetErrorCheck(sheetSubmitted) === true) {return Error( "No sheetSharedDate in Mongo")}; 
    return sheetSubmitted; 
  }

function getSheetColumns(){
    sheetColumns = Sheets.columns; 
    if(sheetErrorCheck(sheetColumns) === true) {return Error( "No columns in Mongo")}; 
    return sheetColumns; 
  }



  function getHot_colHeaders(isOwner){
    colHeaders = []
    dSchema = getHot_columns(isOwner)
    //console.log(dSchema)
    dSchemaLength = dSchema.length
    //console.log(dSchemaLength)
    for(var i = 0; i < dSchemaLength; i++){
      
      colName = dSchema[i]['data']
      colHeaders.push(colName)
      
    }

    
    return colHeaders
    }
    
    function getHot_colWidths(isOwner){
      colWidths = []
      colHeaders = getHot_colHeaders(isOwner)
      $(colHeaders).each(function(x,y){
          headerLength = y.length
          colWidth = headerLength * 20
          colWidths.push(colWidth)
      })
      return colWidths
      
    }
    
    

  function getHot_dataSchema(){
    dataSchema = {sheetOwnerAuthor: sheetOwnerAuthor, sheetId: sheetId, sheetEditorEmail: Session.get("userEmail") }
    colHeaders = getHot_colHeaders()
    numCols = cols.length;
    for (var i = 0; i < numCols; i++) {
      columnName = cols[i]['columnName']; 
      dataSchema[columnName] = null
    }
    return dataSchema
    
  }

  function getHot_columns(isOwner){
    

    columns = []
    cols = getSheetColumns()
    numCols = cols.length
    for (var i = 0; i < numCols; i++) {
          columnName = cols[i]['columnName']; 
          whoView = cols[i]['whoView']
          whoEdit = cols[i]['whoEdit']
          
              
            if(isOwner === true){
                
                readOnly = false;
                cellRender = "text"
                
                whoEditMatch = whoEdit.match(/guest/)
                //console.log(whoEditMatch)
                if(whoEditMatch !== null){
                  readOnly = true;
                  cellRender = yellowRenderer
                  //console.log(whoEditMatch)
                }
                
                
                
                
                colObj = {data: columnName, readOnly: readOnly, renderer: cellRender}
                //colObj = {data: columnName, readOnly: readOnly}
                columns.push(colObj)
            }
      
          if(isOwner === false){

            readOnly = false;
            cellRender = "text"
            
            whoEditMatch = whoEdit.match(/owner/)
            //console.log(whoEditMatch)
            if(whoEditMatch !== null){
              readOnly = true;
              cellRender = yellowRenderer
              //console.log(whoEditMatch)
            }
            
                colObj = {data: columnName, readOnly: readOnly, renderer: cellRender}
                //colObj = {data: columnName, readOnly: readOnly}
                columns.push(colObj)


            

          }
    }
    
    return columns
    }



function insertSheetData(sheetDataArray){
  numRows = sheetDataArray.length
  for (var i = 0; i < numRows; i++) {
    SheetData.insert(sheetDataArray[i])
  }
  
}

function getSheetData(sheetId){
  
}


    
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
                      loadData = sheetData.find({sheetId: sheetId, sheetOwnerAuthor: Session.get("userEmail") }).fetch()
                      
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
  colHeaders: getHot_colHeaders(false),
  colWidths: getHot_colWidths(false), 
  dataSchema: getHot_dataSchema(),
  columns: getHot_columns(false),
  minSpareRows: 1

});

// This way, you can access Handsontable api methods by passing their names as an argument, e.g.:
hotInstance = $("#HOT").handsontable('getInstance');

$("#saveSheet").click(function(){
  saveData = $("#HOT").handsontable('getData');
  $(saveData).each(function(x,y){
      //sheetData.insert(y)
      dataId = y['_id']
      sheetData.update({_id: dataId},y,{ upsert: true })
      
      
    
  })
  
  
})

        
    }); 
  
  }
  
}