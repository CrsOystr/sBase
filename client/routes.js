import { Meteor } from 'meteor/meteor';

Router.configure({
    notFoundTemplate: '404'
});

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

Router.route('/user/:_username', {
    template: 'userProfile',
    data: function(){
        return this.params._username;
    },
    action: function(){
        if (Meteor.users.findOne({username: this.params._username})){
            this.render();
        }
        else{
            this.render('userDenied');
        }
    }
});




Router.onBeforeAction(function() {
  if (!Meteor.user()) {
    this.render('accessDenied');
  } else
  {
    this.next();
  }
}, {only: ['add', 'add/']});
