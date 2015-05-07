  
Meteor.startup(function () {

sharedSheetEmailSnippet = "A user has shared a sheet with you. Datagator is an application for gathing and storing data quickly and easily." +
"</br></br> DataGator is a free product, but you will need to register in order to respond" +
"</br></br> Go to <a href='http://datagator.us'>DataGator</a> to sign in." +
"</br></br>Sincerely," +
"</br>Dave" 

if(allowEmails == true){
          
          if(emailAmazon == true){
           // format smtp://USERNAME:PASSWORD@HOST:PORT/   
            var emailUserName = "AKIAJGK72RSCV767GIAQ"
            var smtpPassword = "Akxh/aCVLh0yDl1s5cOBl3GoAII6ODwjRLrLf0Sr+uWE"
            var emailServerName = "email-smtp.us-east-1.amazonaws.com"
            var emailPort = "25"
            var mailString = "smtp://" + emailUserName + ":" + smtpPassword + "@" + emailServerName + ":" + emailPort
            console.log(mailString)
            process.env.MAIL_URL = mailString;
          }
          
  
          if(emailMailGun == true){
            options = {
                  apiKey: 'key-5a660f85bd6b623b811b3b637b24c400',
                  domain: 'mg.datagator.us'
            }
          }
            
            
} else {}

});




Meteor.methods({
  

email_notifyShared_newUser: function (email) {
    var email = email.toLowerCase()
    var blockResultArray = emailBlockList.find({emailAddress: email}).fetch()
    if(blockResultArray.length > 0){
    } else{
    this.unblock();

    if(emailAmazon == true){
          Email.send({
            to: email,
            from: "dave@datagator.us",
            subject: "DataGator: A user has shared a sheet with you!",
            html: sharedSheetEmailSnippet
          
          });
      } 
      
      if(emailMailGun == true){
        var NigerianPrinceGun = new Mailgun(options);
        NigerianPrinceGun.send({
                               'to': email,
                               'from': 'sirmartymoose@gmail.com',
                               'html': sharedSheetEmailSnippet,
                               'text': '',
                               'subject': 'Datagator: A user has shared a sheet with you'
                           });
        
        
      }
      
      
    }
  }, 
    isBlockedEmail: function(email){
    var email = email.toLowerCase()
     var blockResultArray = emailBlockList.find({emailAddress: email}).fetch()
     if(blockResultArray.length > 0){
       return true
     } else {return false}
  }, 
  
  addBlockedEmail: function(email){
    var email = email.toLowerCase()
    var blockResultArray = emailBlockList.find({emailAddress: email}).fetch()
    if(blockResultArray.length > 0){ return "Already done"  }
    else {return emailBlockList.insert({emailAddress: email}) ; return "Inserted"  }
  }, 
  showBlockedEmails: function(){
    return emailBlockList.find().fetch()
  }
  
  
  
});

   

    