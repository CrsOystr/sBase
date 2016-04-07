import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { UserProfileLinks } from '../api/userProfileLink.js';

import './userProfile.html';


Template.userProfile.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('userprofiles');
});

Template.userProfile.helpers({
    userTitle(){
        return this.toString();
    },
    userLinks(){
        const name = this.toString();
        return UserProfileLinks.find({username: name});
    },
});
Template.profileLink.helpers({
    isOwner() {
        return this.username === Meteor.user().username;
    },
    getMedia(){
        var siteName = 'reddit';
        return siteName;
    },
});

Template.profileLink.events({
    'click .delete'() {
      Meteor.call('userprofiles.remove', this._id);
    },
});
