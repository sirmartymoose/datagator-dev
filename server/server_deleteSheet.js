Meteor.methods({
      
      // Start DG-50
      
      deleteSheet : function(sheetId, password, includeSheetDefinitions, includeSheetData){
            //cLog("DeleteSheet: Called")
            var pwCorrect = Match.test(password, 'Dave1234') 
            
            if(pwCorrect == true){
                  //cLog("DeleteSheet: Password Correct")
                  
                  if(includeSheetDefinitions == true){
                        //cLog("DeleteSheet: IncludeSheetDefinitions set to True")
                        sheetDefinitions.remove({_id: sheetId})
                        //cLog("DeleteSheet: Hopefully delted sheetDefinitions")
                  }
                  if(includeSheetData == true){
                        //cLog("DeleteSheet: IncludeSheetData set to True")
                        sheetData.remove({sheetId: sheetId})
                        //cLog("DeleteSheet: Hopefully delted sheetData")
                  }
            } else
                  { //cLog("DeleteSheet: Password Incorrect") }
            }
      }
      // End DG-50
      
      
      })