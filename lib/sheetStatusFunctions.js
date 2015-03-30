// sheet Id (sheetId)
// sheet Name (sheetName)
// Created Date (createdDate)
// Status (Shared vs. Saved)
// Shared Date (out of scope)
// Num Peeps (numGuests)
// Number Contributions (numContributed)
// Number pending (numPending)



    if (Meteor.isClient) {

        testLoad = function(){
            console.log("Test Load Called and run")
        }

        getUserSheetDefinitions = function(){
            var userData = sheetDefinitions.find({userId: Meteor.userId()}).fetch()
            return userData
        }

        getUserSheetReferenceData = function(mongoSheetDefinitionsData) {
            var finalOutputArray = []
            var referenceData = mongoSheetDefinitionsData
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

    if (Meteor.isClient) {


    }

