
if (Meteor.isClient) {
  
            Template.viewSharedSheet.rendered = function () {
              
                // Tried to remove this. Atomic.js is dependent on this. seems redundant
                 Sheets = sheetDefinitions.findOne({_id: sheetId})
              
              
                //' Get the Session sheet Id'
                sheetId = Session.get('mySheetId')
                
                // Get the Users email
                sheetOwnerAuthor = Session.get("userEmail")
                
                //Start: $(document).ready() Load The DOM //////
          
                $(document).ready(function(){
                
                
                          // Display the title of the sheet
                              $("#sheetNameValue").html(getSheetTitle())
                          
                            /// ??? /// Seems REdundant to Sheets = SheetDefinitions
                            myData = sheetDefinitions.findOne({_id: sheetId})
                            
                            
                            /// ??? /// Seems redundant with $(sheetNameValue).html (getSheetTitle())
                            $("#results").append(myData['title'])
                            
                            /// Get the sheetData with SheetId and SheetOwnerAuthor as Vars /// 
                              function getData() {
                                    resultArray = []
                                    loadData = sheetData.find({sheetId: sheetId, sheetOwnerAuthor: Session.get("userEmail") }).fetch()
                                
                                    $(loadData).each(function(x,y){
                                          resultArray.push(y)
                                    })
                                    
                                    return resultArray
                              }
                    
                               /// HOT: Style the Table for Read Only. Consider Moving to Atomic. 
                               yellowRenderer = function(instance, td, row, col, prop, value, cellProperties) {
                                    Handsontable.renderers.TextRenderer.apply(this, arguments);
                                    td.style.backgroundColor = "#ececec";
                                };
                    
                    
                                /// Handsontable define the destination DOM
                                var $container = $("#HOT");
                    
                        
                                /// Load the Table with the Settings
                        
                                 $container.handsontable({
                                  data: getData(),
                                  colHeaders: getHot_colHeaders(false),
                                  colWidths: getHot_colWidths(false), 
                                  dataSchema: getHot_dataSchema(),
                                  columns: getHot_columns(false),
                                  minSpareRows: 1
                                });
                    
                    
                                /// ???? Seems unnecessary ///
                                //hotInstance = $("#HOT").handsontable('getInstance');
                                
                                
                                
                                // Update the data in the DB when closing
                                $("#saveSheet").click(function(){
                                      saveData = $("#HOT").handsontable('getData');
                                  
                                      $(saveData).each(function(x,y){
                                          dataId = y['_id']
                                          sheetData.update({_id: dataId},y,{ upsert: true })
                                      })
                                  })
          
                  
              }); 
            
            }
  
}