if (Meteor.isClient) {
      
      
            highlight_error = function(elementId){
                  $(elementId).attr('class', 'form-group has-error');
            }
            
            add_help = function(elementId, helpMessage){
                 var helpSnippet = "<span id='helpBlock' class='help-block'>" + helpMessage + "</span>"
                 $(elementId).append(helpSnippet)
            }
            
            notify_validationError = function(elementId, msg){
                  var alertSnippet = "<div class='alert alert-danger' role='alert'>" + msg + "</div>"
                  $(elementId).html(alertSnippet)
            }
            

    Template.createSheet.rendered = function () {
          
      // Start DG-27
            // main title = title (id)
            // class=colGroup: columnName, dataType, whoView, whoEdit
            
            validate_sheetName = function(){
                  var sheetName = $("#title").val()      
                  if(sheetName.length < 1){
                        highlight_error("#titleFormGroup")
                        add_help("#titleFormGroup", "Sheet Must have a name.")
                        createSheetValid = false;
                  } else {
                        createSheetValid = true; 
                  }
                  
                  return createSheetValid
            
            }
            
            validate_sheetFieldsHaveTitles = function(){
                  var columnsHaveTitles = true
                  $(".colGroup").each(function(){
                        var myField  = $(this).find("#columnName").val()
                        cLog("validate: sheetFieldsHaveTitles: Here is the value of the field: " + myField)
                        if (myField.length < 1){
                           cLog("validate: sheetFieldsHaveTitles: Since the length of this field is less than 1  we will proceed")      
                           highlight_error(this)
                           cLog("validate: sheetFieldsHaveTitles: Just highlighted the error")      
                           add_help(this, "Column Needs a name")
                           cLog("validate: sheetFieldsHaveTitles: Just added help context")      
                           columnsHaveTitles = false
                           cLog("validate: sheetFieldsHaveTitles: Just set Colulmns have titles to false")      

                           
                        }
                        
                  })
                  cLog("validate: sheetFieldsHaveTitles: Here is the return value " + columnsHaveTitles)
                  return columnsHaveTitles
            }
            
            validate_createSheet = function(){
                  var finalValidation = false
                  finalValidation = validate_sheetName()
                  finalValidation = validate_sheetFieldsHaveTitles()
                  
                  
                  if(finalValidation == false){
                        notify_validationError("#errorMessage", "We found invalid values that you need to correct before creating your sheet.")
                  }
                  return finalValidation
                  
            }
            

      
      // End DG-27
      
      
          
          
    }
    
    
}