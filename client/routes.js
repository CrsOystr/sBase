import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Deps.autorun(function(){
  Meteor.subscribe('userNames');
});

Router.configure({
    layoutTemplate: 'AppLayout',
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
    waitOn: function() {
        return this.subscribe('userNames');
    },
    data: function(){
        return this.params._username;
    },
    action: function(){
        if(this.ready){
            console.log(this.params._username);
            //console.log(Meteor.call('getUserNames',this.params._username));
            console.log(Meteor.users.find({username: this.params._username}).fetch());

            if (Meteor.users.findOne({username: this.params._username})){
                this.render();
            }
            else{
                this.render('userDenied');
            }
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
