Meteor.startup(function () {
      allowEmails = false
})


function client_email_notifyShared_newUser() {

      var em_title = "DataGator: Someone has shared a sheet with you"
      var em_content = "<h4> A user has shared some content with you on datagator. <h4><br> <h1> test </h1> <br> <a href='http://datagator.us:3000'/>"

      Meteor.call('email_notifyShared_newUser',
          'sirmartymoose@gmail.com',
          'dave@datagator.us',
          em_title,
          em_content);

  }
  
  
  
 processEmails = function(emailArray){
      $(emailArray).each(function(x,y){
              Meteor.call('email_notifyShared_newUser', y)
      })
  }



addSharedEmails = function() {
      sharedEmailArray = []
      sharedEmailArray = getGridEmailValues()
      sharedEmails = {sharedEmails: sharedEmailArray}
      sheetDefinitions.update({_id: Session.get('mySheetId')}, {$set: sharedEmails})
          lineIterator = 0
          saveData = $("#HOT").handsontable('getData');
          numLines = saveData.length
          $(saveData).each(function (x, y) {
              //sheetData.insert(y)
              dataId = y['_id']
              if (lineIterator < numLines - 1) {
                  sheetData.update({_id: dataId}, y, {upsert: true})
                  lineIterator = lineIterator + 1;
              }
          })
      return sharedEmailArray
}


getSharedEmails = function() {
            shareResult = getGridEmailValues()
            return shareResult
        }
        
        
 newEmailFilter = function(){
    alreadySharedArray =  _.pluck(sheetDefinitions.find({_id: Session.get('mySheetId') }, {fields: {sharedEmails:1, _id: 0}}).fetch(), 'sharedEmails')
    alreadySharedArray = alreadySharedArray[0]
    shareResult = getGridEmailValues()
    var diff = _.difference(shareResult , alreadySharedArray);
    return diff
}

