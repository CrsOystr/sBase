import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './profile.html';

Template.profile.helpers({
    isOwner() {
        return this.owner === Meteor.userId();
    },
});

Template.profile.events({
    'click .delete'() {
      Meteor.call('profiles.remove', this._id);
    },
    'click .toggle-private'(){
        Meteor.call('profiles.setPrivate', this._id, !this.private);
    },
});
