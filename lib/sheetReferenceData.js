// sheet Id (sheetId)
// sheet Name (sheetName)
// Created Date (createdDate)
// Status (Shared vs. Saved)
// Shared Date (out of scope)
// Num Peeps (numGuests)
// Number Contributions (numContributed)
// Number pending (numPending)



    if (Meteor.isClient) {

        function showSheet(sheetURL, sheetName, createdTime, shared, sharedTime, uniqueSaved, pendingGuest){

            resultString = "<li class='list-group-item'>"+
            "<div class='row'>"+
            "<div class='col-md-4' >"+
            "<div class='list-group-item-heading'>"+
            "<h4><a href='" + sheetURL  + "'> "+ sheetName +"</a></h4>"+
            "</div>"+
            "</div> "+
            "<div class='col-md-4'>"+
            "	<div class='list-group-item-heading'>"+
            "		<h4>"+ shared + " </h4> "+
            "</div>"+
            "</div>"+
            "<div class='col-md-3'><h4>"+uniqueSaved+" </div>" +
            "</div>"+
            "<div class='row'>"+
            "<div class='col-md-4' > "+
            "Created: " + createdTime +

            "</div> "+
            "<div class='col-md-4'>"+
            "		" + sharedTime +" "+
            "</div>"+
            "<div class='col-md-3'> "+pendingGuest+ "</div>" +

            "</div>"+
            "</li>"

            return resultString
        }




        showOwnedSheets = function(mySheetRefData, destinationId){
            var sheetRefData = mySheetRefData
            $(sheetRefData).each(function(x,y){
                console.log("show owned sheets function called")
                console.log(y)
                var ownedSheetResult = showSheet("posts/" + y['sheetId'], y['sheetName'], y['createdDate'], y['sheetStatus'], 'time', y['numContributed'], y['numPending'])
                $(destinationId).append(ownedSheetResult)
            })

        }

        testLoad = function(){
            console.log("Test Load Called and run")
        }

        getUserSheetDefinitions = function(){
            var userData = sheetDefinitions.find({userId: Meteor.userId()}, {limit: 2, sort: {submitted: -1}}).fetch()
            return userData
        }

        client_getUserSheetsWelcomePage= function(){
            var userId  = Meteor.userId()
            Meteor.call('getUserSheetsWelcomePage', userId, function(err, res){console.log(res); Session.set('userSheets', res)})
            return Session.get('userSheets')


        }




        getUserSheetReferenceData = function(mongoSheetDefinitionsData) {
            console.log("getUserSheetReferenceData called")
            var finalOutputArray = []
            var referenceData = mongoSheetDefinitionsData
            console.log("here is reference data")
            console.log(referenceData)
            console.log("end of reference data")
            $(referenceData).each(function(x,y){
                miniObj = {}
                var sheetId = y['_id']
                var sheetName = y['title']
                var createdDate = y['submitted']
                var sharedEmailsArray = y['sharedEmails']
                var numGuests = sharedEmailsArray.length
                var numContributed = y['contributions'].length
                var numPending = numGuests - numContributed

                if(sharedEmailsArray.length > 0){
                    sheetStatus = 'Shared'
                }else{
                    sheetStatus = 'Saved'
                }

                miniObj['sheetId'] = sheetId
                miniObj['sheetName'] = sheetName
                miniObj['createdDate'] = createdDate
                miniObj['sheetStatus'] = sheetStatus
                miniObj['numGuests'] = numGuests
                miniObj['numContributed'] = numContributed
                miniObj['numPending'] = numPending

                finalOutputArray.push(miniObj)

            })

            return finalOutputArray
        }




    }



if (Meteor.isServer) {

    Meteor.methods(

        {
            getUserSheetsWelcomePage: function(userId){
                var results = sheetDefinitions.find({userId: userId}, {limit: 2, sort: {submitted: -1}}).fetch()
                return results
            }

        }
    )

}

