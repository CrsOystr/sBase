import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Websites } from '../api/websites.js'

import './addMedia.html';

Template.addMedia.onCreated(function addMediaCreated() {
  Meteor.subscribe('websites');

});

Template.profileLink.helpers({
    getMedia: function(){
        var siteName = 'reddit';
        return siteName;
    }
});
