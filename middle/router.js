
Router.route('/sheets', function () {
  this.render('listSheets');
});

Router.route('/landing', function () {
  this.render('landing');
});

Router.route('/', function () {
  if(Meteor.user == null){
    dcReRoute()
  } else {
  this.render('welcome');
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


Router.route('/chat', function () {
  this.render('chat');
});


Router.route('/login', function () {
  this.render('Login');
});


dcLogout = function(){
  Meteor.logout(function() {
    // Redirect to login
    Router.go('/login');
  })
}


dcLogin = function(){
    Router.go('/');
    console.log("HI")
}

dcReRoute = function(){
  console.log("DCREROUTE CALLED")
    Router.go('/landing');
    console.log("HI")
}

