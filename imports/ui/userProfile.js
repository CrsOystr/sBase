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
    isOwner() {
        if (Meteor.user()){
            return this.toString() === Meteor.user().username;
        }else{
            return false;
        }
    },
    userLinks(){
        const name = this.toString();
        return UserProfileLinks.find({username: name});
    },
});
Template.profileLink.helpers({
    isOwner() {
        if (Meteor.user()){
            return this.username === Meteor.user().username;
        }else{
            return false;
        }
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
