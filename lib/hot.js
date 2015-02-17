
sheetErrorCheck = function(variable) {
        if(typeof variable === 'undefined'){
                return true
        };
        }


getSheetTitle = function(){
        title = Sheets.title; 
        if(sheetErrorCheck(title) === true) {return Error( "No Sheet Name in Mongo")}; 
        return title; 
        }


getSheet_id = function(){
        sheetId = Sheets._id
        if(sheetErrorCheck(sheetId) === true) {return Error( "No sheetId in Mongo")}; 
        return sheetId; 
        }

getSheetOwnerAuthor = function(){
        sheetOwnerAuthor = Sheets.author; 
        if(sheetErrorCheck(sheetOwnerAuthor) === true) {return Error( "No sheetOwnerAuthor in Mongo")}; 
        return sheetOwnerAuthor; 
        }

getSheetSubmitted = function(){
        sheetSubmitted = Sheets.submitted; 
        if(sheetErrorCheck(sheetSubmitted) === true) {return Error( "No sheetSharedDate in Mongo")}; 
        return sheetSubmitted; 
        }
        
getSheetColumns = function(){
        sheetColumns = Sheets.columns; 
        if(sheetErrorCheck(sheetColumns) === true) {return Error( "No columns in Mongo")}; 
        return sheetColumns; 
        }


getHot_colHeaders = function(isOwner){
        colHeaders = []
        dSchema = getHot_columns(isOwner)
        dSchemaLength = dSchema.length
        
        for(var i = 0; i < dSchemaLength; i++){
                colName = dSchema[i]['data']
                colHeaders.push(colName)
                }
                
        return colHeaders
        }

getHot_colWidths = function(isOwner){
        colWidths = []
        colHeaders = getHot_colHeaders(isOwner)

        $(colHeaders).each(function(x,y){
                headerLength = y.length
                colWidth = headerLength * 20
                colWidths.push(colWidth)
                })
        return colWidths
        }


getHot_dataSchema = function(){
        dataSchema = {sheetId: sheetId, sheetEditorEmail: Session.get("userEmail") }
        colHeaders = getHot_colHeaders()
        numCols = cols.length;
        
        for (var i = 0; i < numCols; i++) {
                columnName = cols[i]['columnName']; 
                dataSchema[columnName] = null
                }
        return dataSchema

        }
        
        
getHot_columns = function(isOwner){
        columns = []
        cols = getSheetColumns()
        numCols = cols.length

        for (var i = 0; i < numCols; i++) {
                columnName = cols[i]['columnName']; 
                whoView = cols[i]['whoView']
                whoEdit = cols[i]['whoEdit']
                whoViewMatch = whoView.match(/all/)
  
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
                                
                        if(columnName === "sheetOwnerAuthor"){
                                cellRender = ownerEmailRenderer
                                
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
                        
                        if(whoViewMatch !== null){
  
                         colObj = {data: columnName, readOnly: readOnly, renderer: cellRender}
                        //colObj = {data: columnName, readOnly: readOnly}
                        columns.push(colObj)
                        }

                 }
       
        }
 return columns
        
}


insertSheetData = function(sheetDataArray){

        numRows = sheetDataArray.length
        
        for (var i = 0; i < numRows - 1; i++) {
                SheetData.insert(sheetDataArray[i])
                }
        }

