//sheetDefinitions = new Mongo.Collection("sheetDefinitions");
//sheetData = new Mongo.Collection("sheetData");
//UserAccounts = new Mongo.Collection('users');

//sheetDefinitions.insert({sheetOwnerId: "qAxQC5k6rWmmofXzK", sheetOwnerEmail: "mlynch@gmail.com", sheetId: "a123456", sheetName:"lynch1"})
//sheetDefinitions.insert({sheetOwnerId: "qAxQC5k6rWmmofXzK", sheetOwnerEmail: "mylynch@gmail.com",sheetId: "a1234567", sheetName:"lynch2"})

//console.log(sheetDefinitions.find().fetch())

Meteor.methods({
    sheetInsert: function(sheetAttributes) {
        check(Meteor.userId(), String);
        check(sheetAttributes, {
            title: String,
            contributions: Array, 
            columns: Array
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
    
    sheetDataInsert: function(dataObj){
        var sheetInsertData = dataObj; 
        sheetData.insert(sheetInsertData)
        
    }
});

sheetDefinitions.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    }, 
        update: function(userId, doc) {
        // only allow posting if you are logged in
        return !!userId;
    }
});


