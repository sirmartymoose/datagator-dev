if (Meteor.isClient) {

    call_sheetUpdateContributions = function(sheetId){
        var userId = Meteor.userId();
        var userData = Meteor.users.find({_id: Meteor.userId()}).fetch()
        var userEmail = userData[0]['emails'][0]['address']
        Meteor.call('sheetUpdateContributions', sheetId, userId, userEmail)
    }

}


if (Meteor.isServer) {

    Meteor.methods(

        {
            sheetUpdateContributions: function(sheetId, userId, userEmail){
                console.log("sheetUpdateContributions called")
                var sheetId = sheetId
                var actionDate = new Date();
                //console.log(actionDate)
                var userId = userId
                var userData = Meteor.users.find({_id: Meteor.userId()}).fetch()
                var userEmail = userEmail
                var refData = sheetDefinitions.find({_id: sheetId}).fetch()
                // Has the user contributed before
                var contributorArray = sheetDefinitions.find({_id: sheetId}, {fields: {contributions: 1, _id: 0}}).fetch()
                var contributorArrayZero = contributorArray[0]['contributions']
                console.log(contributorArrayZero)
                var filteredList = _.where(contributorArrayZero, {userId: userId});
                if (filteredList.length > 0){
                    //has contributed before
                    console.log( "Has contributed Before")
                    // EXAMPLE UPDATE: sheetDefinitions.update({_id: "6mgfroNiryzhCSWPX", "contributions.userId": "hi"}, {"$set": {"contributions.$.userId": "there"}})
                    sheetDefinitions.update({_id: sheetId, "contributions.userId": userId}, {"$set": {"contributions.$.actionDate": actionDate}})
                }else{
                    //has not contributed before
                    console.log("HasNotcontributedBeforef")
                    //EXAMPLE ADD: sheetDefinitions.update({_id: "6mgfroNiryzhCSWPX"}, {"$addToSet": {"contributions": {userId: 'ddd'}}})
                    sheetDefinitions.update({_id: sheetId}, {"$addToSet": {"contributions": {userId: userId, userEmail: userEmail, actionDate: actionDate}}})
                }

            }

        }
    )

}