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
    mediaLinks(){
        return UserProfileLinks.find({});
    },
});
Template.profileLink.helpers({
    isOwner() {
        return this.owner === Meteor.userId();
    },
    getMedia(){
        var siteName = 'reddit';
        return siteName;
    },
});

Template.profileLink.events({
    'click .delete'() {
      Meteor.call('profiles.remove', this._id);
    },
});
