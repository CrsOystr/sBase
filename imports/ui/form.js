import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Websites } from '../api/websites.js'

import './form.html';


Template.dropdown.onCreated(function dropdownOnCreated() {
  Meteor.subscribe('websites');
});

Template.dropdown.helpers({
    categories: function(){
        return Websites.find();
    }
});

Template.dropdown.events({
    'change #category-select'(event, template) {
        event.preventDefault();
        const selected_value = $(event.target).val();
        console.log("OK: " + selected_value);
    },
    'click .alertMe'(event){
        event.preventDefault();
        const selected_value = $(event.target).val();
        console.log("OK: " + event.target.value);
        console.log('damn');
    },
});

Template.form.events({
  'submit'(event, template) {
      event.preventDefault();
      console.log("clicked");
      console.log('rekt');
      const target = event.target;
      const url = target.handle.value;
      const handle = target.handle.value;
      console.log(url);
      console.log(handle);

      Meteor.call('userprofiles.insert','Reddit', url, handle);
  },
});
