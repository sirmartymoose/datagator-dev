Meteor.startup(function () {
   // format smtp://USERNAME:PASSWORD@HOST:PORT/   
  var emailUserName = "AKIAJ7D2SDNE5K7S6ZMA"
  var smtpPassword = "AhzqsJFUQ+16EDzkPc3LzDteFL+22pv9M29Q8uXlLKQc"
  var emailServerName = "email-smtp.us-east-1.amazonaws.com"
  var emailPort = "25"
  var mailString = "smtp://" + emailUserName + ":" + smtpPassword + "@" + emailServerName + ":" + emailPort
  console.log(mailString)
  process.env.MAIL_URL = mailString;
  
  /*
      Email.send({
      to: "sirmartymoose@gmail.com",
      from: "dave@datagator.us",
      subject: "TEST EMAIL",
      text: "TEST CONTENT"
    });
    
    */
});




Meteor.methods({
  email_notifyShared_newUser: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});