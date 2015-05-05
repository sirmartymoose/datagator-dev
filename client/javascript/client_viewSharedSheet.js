
if (Meteor.isClient) {
  

  Template.viewSharedSheet.rendered = function () {
        currentUser = Meteor.user()
      Session.set("isOwner", 0)
      guestFields = get_arrayOfFieldsWhereWhoEditIsGuest(Session.get('mySheetId'))

    // Server Functions
      Meteor.subscribe("guestSheetDefinitions", Meteor.user()['emails'][0]['address']);
      Meteor.subscribe("guestSheetData", Meteor.user()['emails'][0]['address']);
      Meteor.subscribe("rabbit", Session.get('mySheetId'));
      
      Sheets = sheetDefinitions.findOne({_id: Session.get('mySheetId')})
      sheetOwnerAuthor = Session.get("userEmail")
      
      rabbitCursor = messages.find({
          sheetId: Session.get('mySheetId')
        });
      var rabbitHandle = rabbitCursor.observe({
          added: function (post) {
              testMessagesUpdate(Session.get('mySheetId'))
          }
      });


  /// Start Dynamic Table
  
          HOTCursor = sheetData.find({
          sheetId: Session.get('mySheetId')
        });
        
        
        var HOTHandle = HOTCursor.observeChanges({
                added: function (id, fields) {
                cLog("database: observeChanges: Record Added: " + id + JSON.stringify(fields))
                hotInstance.loadData(getData())
                cLog("ReRendered Grid")
            }, changed: function(id, fields){
                var miniArray = []
                cLog("database: observeChanges: Record Changed: " + id + JSON.stringify(fields))
                // ONly change if a value in this format
                //{"sheetId":"sjBFqaBaffZGnP8ZP","sheetOwnerAuthor":null,"mycol":"pong","yourcol":null}
                // Matches a value in this format
                // ["yourcol"]
                fieldKeys = _.keys(fields)
                cLog("ID: XYY: fieldKeys are here: " + fieldKeys)
                testValues = guestFields
                cLog("ID: XYY: testValues to look against are here: " + testValues)
                isGuestField = 0
                $(testValues).each(function(x,y){
                    testValue = _.indexOf(fieldKeys, y);
                    if(testValue > -1){
                        isGuestField = 1
                    }
                })
                
                if (isGuestField == 0){
                                    miniFields = fields 
                miniFields['_id'] = id
                cLog(JSON.stringify(miniFields))
                miniArray.push(miniFields)
                updateCells(miniArray)
                cLog("ObserveChagnes:  ABC: Updated")
                    
                } else {
                    
                    cLog("ObserveChagnes: Any Owner Field has been updated, so the grid was not updated: id: ABC: not Updated")
                    
                }

                
            }
        });  
  
  
  /// End 



      $(function () {
          $('[data-toggle="tooltip"]').tooltip()
      })




      // End Share Functions


      $(document).ready(function () {




          $("#sheetName").click(function () {
              $("#leftNav").toggle()

          })// DOM Function to hide left nav by default
            $("#leftNav").hide()

          $("#sheetNameValue").html(getSheetTitle())

          myData = sheetDefinitions.findOne({_id: Session.get('mySheetId')})
          cLog(myData)
          $("#results").append(myData['title'])

          getData = function() {
              resultArray = []
              loadData = sheetData.find({sheetId: Session.get('mySheetId'), sheetOwnerAuthor: Session.get("userEmail")}).fetch()

              $(loadData).each(function (x, y) {
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
              dataSchema: getHot_dataSchema(false),
              columns: getHot_columns(false),
              minSpareRows: 1, 
                afterChange: function(changes, source){
                    cLog("AfterChange: Initiated")
                    cLog("AfterChange: ChangesData: " + changes)
                    cLog("AfterChange: sourceData: " + source)
                    
                    
                    if('null' != changes){
                    
                        cLog("AfterChange: Route: If changes are not 'null'")
                        
                        if(!!changes){
                    
                            cLog("AfterChange: Route: If changes variable exists !!changes")
                    
                            if(changes.length > 0){
                                cLog("AfterChange: Route: If length of changes > 0")
                                cLog("AfterChange: DataType: Changes dataType is " + typeof(changes))
                                cLog("AfterChange: Data: Changes data is: " + changes)
                                cLog("AfterChange: Data: Changes[0] data is: " + changes[0])
                                testChangesVariable = changes[0]
                                cLog("AfterChange: Data: Source data is: " + source)

                                $(changes).each(function(x,y){
                                    cLog("AfterChange: Here is Y" + y)
                                    if(y[3] != null){
                                        cLog("AfterChange: Y3 (new Value) is not null. Here is Y: " + y)
                                        cLog("AfterChange: UpdateCellInDatabase called! Here is the data: updateCellInDatabase(" + y[0] +","+ y[1] + "," + y[3]+ " )")
                                        updateCellInDatabase(y[0], y[1], y[3])
                                        //cLog("AfterChange: UpdateCellInDatabase called for guest! Here is the data: updateCellInDatabase(" + y[0] +","+ 'sheetOwnerAuthor' + "," + Meteor.user()['emails'][0]['address']+ " )")

                                        //updateCellInDatabase(y[0], 'sheetOwnerAuthor', Meteor.user()['emails'][0]['address'])
                                    }
                                })
                                
                            }
                        }
                    } else{
                          cLog("CHANGES null: " + changes)
                          cLog("SOURCE: " + source)
                    }
        
                    
                }
                    
                    

          });

// This way, you can access Handsontable api methods by passing their names as an argument, e.g.:
          hotInstance = $("#HOT").handsontable('getInstance');

          $("#saveSheet").click(function () {
              sheetEvent(Session.get("mySheetId"), "guestSaved")
              call_sheetUpdateContributions(Session.get("mySheetId"))
              lineIterator = 0
              saveData = $("#HOT").handsontable('getData');
              numLines = saveData.length
              $(saveData).each(function (x, y) {
                  //sheetData.insert(y)
                  dataId = y['_id']
                  y['sheetOwnerAuthor'] = sheetOwnerAuthor

                  if (lineIterator < numLines - 1) {
                      sheetData.update({_id: dataId}, y, {upsert: true})
                      lineIterator = lineIterator + 1;
                  }


              })


          })
          
          
          
                    // Chat Functions START
            
            
            sheetId = Session.get('mySheetId')
            
            currentUser = currentUser['emails'][0]['address']
            messageGuest = currentUser
            isOwner = 0
            senderId = Meteor.userId()
            updateChat(sheetId, messageGuest)
            
          
          
          $("#typeMessageText").keyup(function(event){
    if(event.keyCode == 13){
        $("#submitMessageButton").click();
    }
});
          
          
          
          $("#submitMessageButton").click(function(){
            var msg = $("#typeMessageText").val()
        
            Meteor.call('insertMessage', sheetId, senderId,  messageGuest, isOwner,  msg)
            $("#typeMessageText").val("")
            
          })
          
            
   

            // Chat Functions END


      });
  
  }
  
}