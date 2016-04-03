Router.route('/', function () {
  this.render('Home');
});

Router.route('/add', function () {
  this.render('addMedia');
});

Router.route('/add/:social', function () {
  this.render('addMedia');
});

Router.route('/profile', function () {
  this.render('userProfile');
});

Router.onBeforeAction(function() {
  if (!Meteor.user()) {
    this.render('accessDenied');
  } else
  {
    this.next();
  }
}, {only: ['add', 'add/']});
