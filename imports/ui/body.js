import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Profiles } from '../api/profiles.js';
import './body.html';
import './userProfile.js';
import './form.js';
import './addMedia.js';
import './accessDenied.html';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('profiles');
});

Template.body.helpers({
    profiles() {
        const instance = Template.instance();
        return Profiles.find({}, {
            sort: {
                createdAt: -1
            }
        });
    },
});

Template.body.events({
    'submit .new-profile' (event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        Meteor.call('profiles.insert', text);

        //clear form
        target.text.value = '';
    },
});
