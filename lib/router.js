
Router.route('/sheets', function () {
  this.render('listSheets');
});

Router.route('/chat', function () {
  this.render('chat');
});


Router.route('/emailReport', function () {
    this.render('emailReport');
});

Router.route('/landing', function () {
  this.render('landing');
});


Router.route('/beta', function () {
    this.render('beta');
});

Router.route('/', function () {
  if(Meteor.user == null){
    dcReRoute()
  } else {
  this.render('beta');
  }
});

Router.route('/create', function () {
    if(Meteor.user == null){
   dcReRoute()
  } else {
  this.render('createSheet');
  }
});

Router.route('/posts/:_id', {
    name: 'viewSheet',
    data: function() {Session.set("mySheetId", this.params._id); return sheetDefinitions.findOne(this.params._id); }
});

Router.route('/sharedSheets/:_id', {
    name: 'viewSharedSheet',
    data: function() {Session.set("mySheetId", this.params._id); Session.set("userEmail", Meteor.user().emails[0].address); return sheetDefinitions.findOne(this.params._id); }
});


Router.route('/sharedSheets', function () {
  this.render('sharedSheets');
});


Router.route('/admin/sheetHistory', function () {
  this.render('admin_sheetHistory');
});


Router.route('/listOwnedSheets', function () {
  this.render('listOwnedSheets');
});




Router.route('/welcome', function () {
    this.render('welcome');
});



dcLogout = function(){
  Meteor.logout(function() {
    // Redirect to login
    Router.go('/login');
  })
}


dcLogin = function(){
    Router.go('/beta');

}

dcReRoute = function(){
  console.log("DCREROUTE CALLED")
    Router.go('/landing');
    console.log("HI")
}

