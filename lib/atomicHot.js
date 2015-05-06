        // Grid Level Applications
cellRenderArray = []

        hot_stretchColumns = function(){
            hotInstance.updateSettings({stretchH: 'last'})
        }


        hot_addColumn = function(){
            hotInstance.alter('insert_col', null)
        }

        hot_clear = function(){
            hotInstance.clear()
        }

        hot_getSettings = function(){
            console.log(hotInstance.getSettings())
        }


        hot_observeChanges = function(){
            hotInstance.updateSettings({observeChanges: "true"})
        }



        // Cell Level Operations

        hot_setDataAtCell = function(row,col,content){
            hotInstance.setDataAtCell(row, col, content)
        }

        hot_setStyleAtCell = function(row, col, renderer){
            var miniObj= {row: row, col: col, renderer: renderer}
            cellRenderArray.push(miniObj)
            hotInstance.updateSettings({cell: cellRenderArray})
        }


        hot_makeCellReadOnly = function(row, col){
            hotInstance.updateSettings({cell: [{row: row, col: col, readOnly: true}]})
        }

        hot_makeCellEditable = function(row, col){
            hotInstance.updateSettings({cell: [{row: row, col: col, readOnly: false}]})
        }


        // Style Changes


        hot_css_cell_green = function(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.backgroundColor = 'green';

        };
        
        
        hot_css_cell_italic = function(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            //td.style.backgroundColor = 'pink';
            td.style.fontStyle = 'italic'; 
            td.style.backgroundColor = "#ececec";

        };
        
        
        hot_css_cell_sheetOwnerAuthor = function(instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.backgroundColor = 'green';
            td.style.fontStyle = 'italic'; 

        };


        // underscore Atomic

        getIndexOfKeyValue = function(key, val, dataSource) {
            index = _.indexOf(_.pluck(dataSource, key), val);
            return index
        }


        getPositionOfPropertyInObject = function(prop, singleObject){
            cLog("Property we are looking for is: " + prop)
            var myKeys = _.keys(singleObject)
            cLog("getPositionOfPropertyInObject: myKeys: "  + myKeys)
            
            var myOutput = _.indexOf(myKeys, prop)
            cLog("getPositionOfPropertyInObject: myOutputPre: " + myOutput)
            var myOutputFinal = myOutput + 2
            cLog("getPositionOfPropertyInObject: myOutputFinal: " + myOutputFinal)
            return myOutput + 2
            
        }


        getHotRowNumber = function(id, dataSource){
            var rowNum = getIndexOfKeyValue('_id', id, dataSource)
            return rowNum
        }


        // Underscore and HOT

        getHotColPosition = function(prop, rowObject){
            var colNum = getPositionOfPropertyInObject(prop, rowObject)
            return colNum

        }

        getHotRowCol = function(datasource, id, prop){
            var outputArray = []
            var rowNum = getHotRowNumber(id, datasource)
            cLog("GetHotRowCol: Called: RowNum: " + rowNum)
            var colNum = getPositionOfPropertyInObject(prop, datasource[rowNum])
            cLog("GetHotRowCol: Called: ColNum: " + colNum)
            outputArray.push(rowNum)
            gridOffset = Session.get('isOwner')
            
            if(gridOffset == 1){
                var adjustedColNum = colNum - 4
                outputArray.push(colNum - 4)
            } else {
                
                var adjustedColNum = colNum - 5
                outputArray.push(colNum - 5)
            }


            cLog("GetHotRowCol: Called: colNum Adjusted: " + adjustedColNum)
            return outputArray
        }


        findCellAnd_markCellAsChanged = function(datasource, id, prop){
            var changedCell = getHotRowCol(datasource, id, prop)
            if(prop == 'sheetOwnerAuthor'){
                cLog("findCellAnd_markCellAsChanged: Updating SheetOwnerAuthor")
                hot_setStyleAtCell(changedCell[0], changedCell[1], hot_css_cell_sheetOwnerAuthor )   
            } else {
            cLog("findCellAnd_markCellAsChanged: Updating Guest Value")
            hot_setStyleAtCell(changedCell[0], changedCell[1], hot_css_cell_italic)
            }
        }
        
        
        

        findCellAnd_changeValue = function(datasource, id, prop, newValue){
            var changedCell = getHotRowCol(datasource, id, prop)
            hot_setDataAtCell(changedCell[0],changedCell[1],newValue)

        }

        updateCell = function(datasource, id, prop, newValue){
                findCellAnd_changeValue(datasource,id,prop,newValue)
                findCellAnd_markCellAsChanged(datasource, id, prop)

        }
        
        updateOwnerAuthor = function(_Id, ownerAuthor){
            
            
        }
        
        updateCellInDatabase = function(rowNum, colName, newValue){
            cLog("updateCellInDatabase: Attempt: Row Number " + rowNum + "for Column name" + colName + "is attempting to be updated in the DB to " + newValue)
            myGetDataMini = $("#HOT").handsontable('getData')
            myGetDataMiniRow = myGetDataMini[rowNum]
            cLog("updateCellInDatabase: The Grid Data for this Row is" + JSON.stringify(myGetDataMini[rowNum]) )
            myTest = myGetDataMini[rowNum]
            //clog(myGetDataMini[rowNum])
            //cLog("updateCellInDatabase: The ID for this Row is" + myGetDataMini[rowNum]['_id'])
            
            if('_id' in myGetDataMini[rowNum]){
                
                cLog("updateCellInDatabase: since an _id was detected we are assuming this record exists in the DB this is being taken down a path.")
                var myGetDataMiniId = myGetDataMini[rowNum]['_id']
                cLog("updateCellInDatabase: here is the _id value: " + myGetDataMiniId)
                cLog("here is the query:" + "sheetData.update({_id: " +  myGetDataMiniId + "}, { $set:{ " + colName + ": " + newValue + " } } , {upsert: true})")
                            var miniObj = {}
                            miniObj[colName] = newValue
                            sheetData.update({_id: myGetDataMiniId}, { $set: miniObj} , {upsert: true});
                                    
            } else {
                cLog("updateCellInDatabase: since no _id was detected we are assuming is a new database row")
                 var myGetDataMiniId = null
                 sheetData.insert(myGetDataMini[rowNum])
                 cLog("updateCellInDatabase: Hopefully inserted row into database")
                 
                 
            }

        }


        // Changed Output sample Object {user: "DE", other: "HI"}
        // changed(id, fields)
        // Expected output
        // [{_id: '123', user: "DE", other: "HI"}, {_id: '456', user: "DE", other: "HI"}]


        updateCells = function(updateArray){
            $(updateArray).each(function(x,y){
                iter = 0
                console.log(y)
                myPairs = _.pairs(y)
                var littleID = myPairs.pop()
                myPairs.unshift(littleID)
                console.log("PAIRES: " + myPairs)
                var updateId = myPairs[0][1]
                var myProperties = _.keys(y)

                $(myPairs).each(function(z,a){
                    if(iter == 0){
                        iter = iter + 1
                    } else {
                        littleKey = a[0]

                        littleVal = a[1]


                        console.log("UPDATEKEY: " + littleKey)
                        console.log("UPDATEVAL: " + littleVal)
                        updateCell(getData(), updateId, littleKey, littleVal)



                    }

                })




            })
        }
        
        
        get_arrayOfFieldsWhereWhoEditIsGuest = function(sheetId){
             myObj = sheetDefinitions.find({_id: sheetId}, {fields: {_id: 0, columns: 1}}).fetch()
             myList = myObj[0]['columns']
            myFilteredList = _.where(myList, {whoEdit: "guest"})
            var outputArray = _.pluck(myFilteredList, 'columnName')
            return outputArray
        }



    
gridItem_hasId = function(gridObject){
   var gridItemKeys = _.keys(gridObject); 
   var gridItemHasId = _.contains(gridItemKeys, '_id');
   return gridItemHasId
}

gridItem_arrayValues = function(gridObject){
    var gridItemValues = _.values(gridObject);
    return gridItemValues
}

gridItem_isEmpty = function(gridObject){
    
    var evalArray = gridItem_arrayValues(gridObject)
    var z = 0
    $(evalArray).each(function(x,y){
        z = z + y
    })
    
    if (z  == 0){
        return true
    } else {
        return false
    }
    
}


debug_showGridData = function(){
    var result = $("#HOT").handsontable('getData')
    $(result).each(function(x,y){
        console.log(JSON.stringify(y))
    })
    
}

debug_showDatabaseData = function(){
    var result = getData()
    $(result).each(function(x,y){
        console.log(JSON.stringify(y))
    })
    
}