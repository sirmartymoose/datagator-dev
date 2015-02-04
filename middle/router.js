
Router.route('/sheets', function () {
  this.render('listSheets');
});

Router.route('/', function () {
  this.render('welcome');
});

Router.route('/create', function () {
  this.render('createSheet');
});

Router.route('/posts/:_id', {
    name: 'viewSheet',
    data: function() {Session.set("mySheetId", this.params._id); return sheetDefinitions.findOne(this.params._id); }
});