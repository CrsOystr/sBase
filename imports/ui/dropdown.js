import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Websites } from '../api/websites.js'

import './dropdown.html';

Template.dropdown.onCreated(function dropdownOnCreated() {
  Meteor.subscribe('websites');
});

Template.dropdown.helpers({
    categories: function(){
        return Websites.find();
    }
});

Template.dropdown.events({
    "change #category-select": function (event, template) {
        var category = $(event.currentTarget).val();
        console.log("category : " + category);
        // additional code to do what you want with the category
    }
});
