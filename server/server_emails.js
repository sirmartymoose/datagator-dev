  
Meteor.startup(function () {

sharedSheetEmailSnippet = "A user has shared a sheet with you. Datagator is an application for gathing and storing data quickly and easily." +
"</br></br> DataGator is a free product, but you will need to register in order to respond" +
"</br></br> Go to <a href='http://datagator.us'>DataGator</a> to sign in." +
"</br></br>Sincerely," +
"</br>Dave" 

if(allowEmails == true){
   // format smtp://USERNAME:PASSWORD@HOST:PORT/   
    var emailUserName = "AKIAJGK72RSCV767GIAQ"
    var smtpPassword = "Akxh/aCVLh0yDl1s5cOBl3GoAII6ODwjRLrLf0Sr+uWE"
    var emailServerName = "email-smtp.us-east-1.amazonaws.com"
    var emailPort = "25"
    var mailString = "smtp://" + emailUserName + ":" + smtpPassword + "@" + emailServerName + ":" + emailPort
    console.log(mailString)
    process.env.MAIL_URL = mailString;
    
} else {}

});




Meteor.methods({
  email_notifyShared_newUser: function (email) {
    var blockResultArray = emailBlockList.find({emailAddress: email}).fetch()
    if(blockResultArray.length > 0){
    } else{
    this.unblock();

    Email.send({
      to: email,
      from: "dave@datagator.us",
      subject: "DataGator: A user has shared a sheet with you!",
      html: sharedSheetEmailSnippet
    
    });
    }
  }, 
    isBlockedEmail: function(email){
     var blockResultArray = emailBlockList.find({emailAddress: email}).fetch()
     if(blockResultArray.length > 0){
       return true
     } else {return false}
  }, 
  
  addBlockedEmail: function(email){
    var blockResultArray = emailBlockList.find({emailAddress: email}).fetch()
    if(blockResultArray.length > 0){ return "Already done"  }
    else {return emailBlockList.insert({emailAddress: email}) ; return "Inserted"  }
  }, 
  showBlockedEmails: function(){
    return emailBlockList.find().fetch()
  }
  
  
  
});

   

    