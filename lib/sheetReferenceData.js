// refactored Wednesday March 31st
// Check client_getUserSheetsWelcomePage session.get issue on homepage

if (Meteor.isClient) {

    showSheet = function(sheetURL, sheetName, createdTime, shared, sharedTime, uniqueSaved, pendingGuest) {
        resultString = "<li class='list-group-item'>" +
        "<div class='row'>" +
        "<div class='col-md-4 col-xs-4 col-sm-4 col-lg-4' >" +
        "<div class='list-group-item-heading'>" +
        "<h4><a href='" + sheetURL + "'> " + sheetName + "</a></h4>" +
        "</div>" +
        "</div> " +
        "<div class='col-md-4 col-xs-4 col-sm-4 col-lg-4'>" +
        "<div class='list-group-item-heading'>" +
        "<h4>" + shared + " </h4> " +
        "</div>" +
        "</div>" +
        "<div class='col-md-3 col-xs-3 col-sm-3 col-lg-3'><h4>" + uniqueSaved + " Contributed </div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-4 col-xs-4 col-sm-4 col-lg-4' > " +
        "Created: " + mongo_displayDate(createdTime) +
        "</div> " +
        "<div class='col-md-4 col-xs-4 col-sm-4 col-lg-4'>" +
        "" + sharedTime + " " +
        "</div>" +
        "<div class='col-md-3 col-xs-3 col-sm-3 col-lg-3'> " + pendingGuest + " Pending</div>" +
        "</div>" +
        "</li>"
        return resultString
    }


    showOwnedSheets = function (mySheetRefData, destinationId) {
        var sheetRefData = mySheetRefData
        console.log("sheetRefDataLength: " + sheetRefData.length)
        if(sheetRefData.length == 0){
            $(destinationId).append('<p class="welcomeEmptyText"> You have not created any new sheets yet</p>')
        } else {
            $(sheetRefData).each(function (x, y) {
                var ownedSheetResult = showSheet("posts/" + y['sheetId'], y['sheetName'], y['createdDate'], y['sheetStatus'], '', y['numContributed'], y['numPending'])
                $(destinationId).append(ownedSheetResult)
            })
        }
    }


    getUserSheetDefinitions = function () {
        var userData = sheetDefinitions.find({userId: Meteor.userId()}, {sort: {submitted: -1}}).fetch()
        return userData
    }

    client_getUserSheetsWelcomePage = function () {
        var userId = Meteor.userId()
        Meteor.call('getUserSheetsWelcomePage', userId, function (err, res) {
            Session.set('userSheets', res)
        })
        return Session.get('userSheets')
    }


    getUserSheetReferenceData = function (mongoSheetDefinitionsData) {
        var finalOutputArray = []
        var referenceData = mongoSheetDefinitionsData
        $(referenceData).each(function (x, y) {
            miniObj = {}
            var sheetId = y['_id']
            var sheetName = y['title']
            var createdDate = y['submitted']
            var sharedEmailsArray = y['sharedEmails']
            var numGuests = sharedEmailsArray.length
            var numContributed = y['contributions'].length
            var numPending = numGuests - numContributed

            if (sharedEmailsArray.length > 0) {
                sheetStatus = 'Shared'
            } else {
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

    } // End getUserSheetReferenceData


}// End Meteor.isClient


if (Meteor.isServer) {

    Meteor.methods({

            getUserSheetsWelcomePage: function (userId) {
                var results = sheetDefinitions.find({userId: userId}, {limit: 2, sort: {submitted: -1}}).fetch()
                return results
            }

        }) // End Meteor.methods

} // End Meteor.isServer

