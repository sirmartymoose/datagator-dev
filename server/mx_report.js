Meteor.methods({
  mx_test_method: function (){
        
        //debug console.log(Meteor.call('mx_test_method', function(err, res){console.log(res)}) )
        return "CALLED"
  }, 
  
  mx_test_email: function(){
      Email.send({
      to: "dave@datagator.us",
      from: "dave@datagator.us",
      subject: "dave@datagator.us",
      text: "dave@datagator.us"
    });
        
  }
  
  
  
  
});