
    


sheetDefinitions = new Mongo.Collection("sheetDefinitions");
sheetData = new Mongo.Collection("sheetData");
userActions = new Mongo.Collection("userActions");
sheetHistory = new Mongo.Collection("sheetHistory");
chatHistory = new Mongo.Collection("chatHistory");

if (Meteor.isServer) {
    Meteor.methods({
        sheetInsert: function (sheetAttributes) {
            check(Meteor.userId(), String);
            check(sheetAttributes, {
                title: String,
                contributions: Array,
                sharedEmails: Array,
                columns: Array,
                sheetOwnerId: String
            });


            //._extend method part of Underscore library
            var user = Meteor.user();
            var sheet = _.extend(sheetAttributes, {
                userId: user._id,
                author: user.username,
                submitted: new Date()
            });

            var sheetId = sheetDefinitions.insert(sheet);

            return {
                _id: sheetId
            };
        },

        sheetDataInsert: function (dataObj) {
            var sheetInsertData = dataObj;
            sheetData.insert(sheetInsertData)

        }
    });

    sheetDefinitions.allow({
        insert: function (userId, doc) {
            // only allow posting if you are logged in
            return !!userId;
        },
        update: function (userId, doc) {
            // only allow posting if you are logged in
            return !!userId;
        }
    });

    Meteor.publish('guestSheetDefinitions', function publishFunction(guestEmail) { return sheetDefinitions.find({sharedEmails: guestEmail}, {fields: {_id:1, columns: 1, contributions: 1, author: 1, sharedEmails: 1, submitted: 1, title: 1, userId: 1 }})  })
    // Debug sheetDefinitions.find({sharedEmails: "r04v2@gmail.com"}, {fields: {_id:1, columns: 1, contributions: 1, author: 1, sharedEmails: 1, submitted: 1, title: 1, userId: 1 }}).fetch()
    Meteor.publish('guestSheetData', function publishFunction(guestEmail) { return sheetData.find({sheetOwnerAuthor: guestEmail})  })
    // Debug sheetData.find({sheetOwnerAuthor: "r04v2@gmail.com"}).fetch()
    Meteor.publish("ownerSheetDefinitions", function () { return sheetDefinitions.find({ userId: this.userId }, { }); });
    // Debug sheetDefinitions.find({ userId: this.userId }, { }).fetch()
    Meteor.publish("ownerSheetData", function () { return sheetData.find({sheetId: {$in: _.pluck (sheetDefinitions.find({userId: this.userId}).fetch(), '_id')}}) });
    //Debug sheetData.find({sheetId: {$in: _.pluck (sheetDefinitions.find({userId: this.userId}).fetch(), '_id')}}).fetch()

}




if (Meteor.isClient) {
    
    if(Meteor.userId() == null){
        cLog("db.js: Meteor UserId is Null")

    } else {
    
    cLog("db.js: Meteor UserId is Not Null")

    }

}
